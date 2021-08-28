defmodule Community.Application do
  @moduledoc false

  use Application

  def start(_type, _args) do
    children = [
      {Goth, name: Community.Goth, source: {:service_account, Application.get_env(:community, :gcp_credentials), []}},
      # Start the Ecto repository
      Community.Repo,
      # Start the Telemetry supervisor
      CommunityWeb.Telemetry,
      # Start the PubSub system
      {Phoenix.PubSub, name: Community.PubSub},
      # Start the Guardian KeyServer
      Community.Guardian.KeyServer,
      # Start the Endpoint (http/https)
      CommunityWeb.Endpoint
    ]

    opts = [strategy: :one_for_one, name: Community.Supervisor]
    Supervisor.start_link(children, opts)
  end

  def config_change(changed, _new, removed) do
    CommunityWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
