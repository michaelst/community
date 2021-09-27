import Config

gcp_credentials =
  case config_env() do
    :prod -> System.fetch_env!("GCP_CREDENTIALS") |> Jason.decode!()
    _env -> File.read!("gcp-credentials.json") |> Jason.decode!()
  end

gcp_project_id = gcp_credentials["project_id"]

app_reviewer_password =
  case config_env() do
    :prod -> System.fetch_env!("APP_REVIEWER_PASSWORD")
    _env -> "password"
  end

config :community,
  gcp_credentials: gcp_credentials,
  gcp_project_id: gcp_project_id,
  app_reviewer_password: app_reviewer_password

config :community, Community.Guardian, issuer: "https://securetoken.google.com/#{gcp_project_id}"

db_config =
  case config_env() do
    :prod ->
      [
        username: System.fetch_env!("DB_USERNAME"),
        password: System.fetch_env!("DB_PASSWORD"),
        database: "community",
        hostname: System.fetch_env!("DB_HOSTNAME"),
        pool_size: 10
      ]

    env ->
      [
        username: "postgres",
        password: "postgres",
        database: "community_#{env}#{System.get_env("MIX_TEST_PARTITION")}",
        hostname: "localhost"
      ]
  end

config :community, Community.Repo, db_config

if config_env() == :prod do
  config :community, CommunityWeb.Endpoint,
    url: [host: System.fetch_env!("HOST"), port: 443],
    secret_key_base: System.fetch_env!("SECRET_KEY_BASE")
end

cors_origins =
  case config_env() do
    :prod -> System.fetch_env!("CORS_ORIGINS") |> String.split(",")
    _env -> ["http://localhost:8080"]
  end

config :cors_plug, origin: cors_origins
