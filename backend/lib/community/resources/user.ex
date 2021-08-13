defmodule Community.User do
  use Ash.Resource,
    data_layer: AshPostgres.DataLayer,
    extensions: [
      AshGraphql.Resource
    ],
    authorizers: [
      AshPolicyAuthorizer.Authorizer
    ]

  postgres do
    table "user"
    repo Community.Repo
  end

  attributes do
    uuid_primary_key :id

    attribute :admin, :boolean, allow_nil?: false, default: false, private?: true
    attribute :approved, :boolean, allow_nil?: false, default: false
    attribute :firebase_id, :string, allow_nil?: false, private?: true
    attribute :owner, :boolean, allow_nil?: false, default: false
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
      list :list_users, :read
    end

    mutations do
      update :update_user, :update
    end
  end

  policies do
    policy always() do
      authorize_if actor_attribute_equals(:admin, true)
    end
  end
end
