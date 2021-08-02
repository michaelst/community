defmodule Community.User do
  use Ash.Resource,
    data_layer: AshPostgres.DataLayer,
    extensions: [
      AshGraphql.Resource
    ]

  postgres do
    table "user"
    repo Community.Repo
  end

  attributes do
    uuid_primary_key :id

    attribute :approved, :boolean, allow_nil?: false, default: false, private?: true
    attribute :firebase_id, :string, allow_nil?: false, private?: true
    attribute :owner, :boolean, allow_nil?: false, default: false, private?: true
    attribute :unit, :string

    timestamps()
  end

  identities do
    identity :firebase_id, :firebase_id
  end

  graphql do
    type :user

    queries do
      get :get_user, :read
      #read_one :current_user, :current_user
      list :list_users, :read
    end

    mutations do
      create :create_user, :create
      update :update_user, :update
      destroy :delete_user, :destroy
    end
  end
end
