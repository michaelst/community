use Mix.Config

config :community, Community.Repo,
  show_sensitive_data_on_connection_error: true,
  pool_size: 10

config :community, CommunityWeb.Endpoint,
  http: [port: 4000],
  debug_errors: true,
  code_reloader: true,
  check_origin: false,
  watchers: []

config :logger, :console, format: "[$level] $message\n"

config :phoenix, :stacktrace_depth, 20

config :phoenix, :plug_init_mode, :runtime
