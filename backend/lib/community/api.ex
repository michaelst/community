defmodule Community.Api do
  use Ash.Api,
    extensions: [
      AshGraphql.Api
    ]

  resources do
    resource Community.Announcement
    resource Community.User
  end
end
