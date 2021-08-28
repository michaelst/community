use Mix.Config

config :community,
  mix_env: Mix.env(),
  ecto_repos: [Community.Repo],
  ash_apis: [Community.Api]

config :community, CommunityWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "z5Qqc8ruECINf8qP/C/h5pjLiKN15mcIUxdm3CM09nbemC0THEcsnKYoE1ep5Jgh",
  render_errors: [view: CommunityWeb.ErrorView, accepts: ~w(json), layout: false],
  pubsub_server: Community.PubSub

config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

config :phoenix, :json_library, Jason

config :community, Community.Guardian,
  verify_issuer: true,
  allowed_algos: ["RS256"],
  secret_fetcher: Community.Guardian.KeyServer

config :tesla, :adapter, Tesla.Adapter.Mint

import_config "#{Mix.env()}.exs"
