defmodule Community.Announcement do
  use Ash.Resource,
    data_layer: AshPostgres.DataLayer,
    extensions: [AshGraphql.Resource],
    authorizers: [AshPolicyAuthorizer.Authorizer],
    notifiers: [Community.Notifiers.SendNotification]

  postgres do
    table "announcement"
    repo Community.Repo
  end

  attributes do
    uuid_primary_key :id

    attribute :body, :string, allow_nil?: false
    attribute :renter_viewable, :boolean, allow_nil?: false, default: false

    create_timestamp :inserted_at, private?: false
    update_timestamp :updated_at, private?: false
  end

  graphql do
    type :announcement

    queries do
      get :get_announcement, :read, allow_nil?: false
      list :list_announcements, :read
    end

    mutations do
      create :create_announcement, :create
      update :update_announcement, :update
      destroy :delete_announcement, :destroy
    end
  end

  policies do
    policy action_type(:read) do
      # unless the actor is an approved user, forbid their request
      forbid_unless actor_attribute_equals(:approved, true)
      # if an announcement is renter_viewable, all approved users can view it
      authorize_if attribute(:renter_viewable, true)
      # or if the actor is an owner they can view all announcements
      authorize_if actor_attribute_equals(:owner, true)
    end

    policy [action_type(:create), action_type(:update), action_type(:destory)] do
      authorize_if actor_attribute_equals(:admin, true)
    end
  end
end
