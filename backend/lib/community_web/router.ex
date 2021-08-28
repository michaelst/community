defmodule CommunityWeb.Router do
  use CommunityWeb, :router

  pipeline :api do
    plug :accepts, [:json]
    plug Guardian.Plug.Pipeline, module: Community.Guardian, error_handler: Community.Guardian.AuthErrorHandler
    plug Guardian.Plug.VerifyHeader
    plug Guardian.Plug.EnsureAuthenticated
    plug Guardian.Plug.LoadResource
    plug CommunityWeb.ActorPlug
    plug :put_secure_browser_headers
    plug Plug.Logger
  end

  forward "/_health", CommunityWeb.HealthCheck

  scope "/" do
    pipe_through :api

    forward "/graphql", Absinthe.Plug, schema: Community.Schema
  end
end
