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

    attribute :admin, :boolean, allow_nil?: false, default: false
    attribute :approved, :boolean, allow_nil?: false, default: false
    attribute :firebase_id, :string, allow_nil?: false, private?: true
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
    end
  end

  policies do
    policy always() do
      authorize_if action(:current_resident)
      authorize_if actor_attribute_equals(:admin, true)
    end
  end
end
