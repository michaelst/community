defmodule Community.Resident do
  use Ash.Resource,
    data_layer: AshPostgres.DataLayer,
    extensions: [
      AshGraphql.Resource
    ],
    authorizers: [
      AshPolicyAuthorizer.Authorizer
    ]

  postgres do
    table "resident"
    repo Community.Repo
  end

  attributes do
    uuid_primary_key :id

    attribute :account_number, :string
    attribute :admin, :boolean, allow_nil?: false, default: false
    attribute :approved, :boolean, allow_nil?: false, default: false
    attribute :firebase_id, :string, allow_nil?: false, private?: true
    attribute :name, :string
    attribute :owner, :boolean, allow_nil?: false, default: false
    attribute :unit, :string

    timestamps()
  end

  identities do
    identity :firebase_id, :firebase_id
  end

  actions do
    read :read, primary?: true

    read :current_resident do
      filter id: actor(:id)
    end

    update :update, primary?: true

    update :update_profile do
      accept [:name, :unit, :account_number]
      change Community.Resident.Changes.ApproveAppReviewer
    end
  end

  graphql do
    type :resident

    queries do
      get :get_resident, :read
      read_one :current_resident, :current_resident, allow_nil?: false
      list :list_residents, :read
    end

    mutations do
      update :update_resident, :update
      update :update_profile, :update_profile, read_action: :current_resident, identity: false
    end
  end

  policies do
    policy always() do
      # allow admin to do everything
      authorize_if actor_attribute_equals(:admin, true)
      # allow resident to get/update their details
      authorize_if action(:current_resident)
      authorize_if action(:update_profile)
    end
  end
end
