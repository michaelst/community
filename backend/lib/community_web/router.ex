defmodule CommunityWeb.Router do
  use CommunityWeb, :router

  pipeline :api do
    plug :accepts, [:json]
    plug CommunityWeb.ActorPlug
    plug :put_secure_browser_headers
    plug Plug.Logger
  end

  scope "/" do
    pipe_through :api

    forward "/graphql", Absinthe.Plug, schema: Community.Schema
  end
end
