use Mix.Config

config :logger, level: :info

config :community, CommunityWeb.Endpoint,
  debug_errors: false,
  http: [
    port: 4000,
    protocol_options: [max_keepalive: :infinity],
    compress: true
  ],
  server: true
