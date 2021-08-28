use Mix.Config

config :community, Community.Repo, pool: Ecto.Adapters.SQL.Sandbox

config :community, CommunityWeb.Endpoint,
  http: [port: 4002],
  server: false

config :logger, level: :warn

config :tesla, adapter: Tesla.Mock
