defmodule Community.Announcement do
  use Ash.Resource,
    data_layer: AshPostgres.DataLayer,
    extensions: [
      AshGraphql.Resource
    ]

  postgres do
    table "announcement"
    repo Community.Repo
  end

  attributes do
    uuid_primary_key :id

    attribute :body, :string, allow_nil?: false
    attribute :renter_viewable, :boolean, allow_nil?: false, default: false, private?: true

    timestamps()
  end

  actions do
    read :read do
      filter expr(renter_viewable == true or ^actor(:owner) == true)
    end
  end

  graphql do
    type :announcement

    queries do
      get :get_announcement, :read
      list :list_announcements, :read
    end

    mutations do
      create :create_announcement, :create
      update :update_announcement, :update
      destroy :delete_announcement, :destroy
    end
  end
end
