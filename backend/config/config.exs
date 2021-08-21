# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :community,
  mix_env: Mix.env(),
  ecto_repos: [Community.Repo],
  ash_apis: [Community.Api]

# Configures the endpoint
config :community, CommunityWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "z5Qqc8ruECINf8qP/C/h5pjLiKN15mcIUxdm3CM09nbemC0THEcsnKYoE1ep5Jgh",
  render_errors: [view: CommunityWeb.ErrorView, accepts: ~w(json), layout: false],
  pubsub_server: Community.PubSub,
  live_view: [signing_salt: "/TtwW9uj"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

config :community, Community.Guardian,
  verify_issuer: true,
  allowed_algos: ["RS256"],
  secret_fetcher: Community.Guardian.KeyServer

config :tesla, :adapter, Tesla.Adapter.Mint

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
