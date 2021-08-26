import Config

gcp_credentials = File.read!("gcp-credentials.json") |> Jason.decode!()
gcp_project_id = gcp_credentials["project_id"]

config :community,
  gcp_credentials: gcp_credentials,
  gcp_project_id: gcp_project_id

config :community, Community.Guardian, issuer: "https://securetoken.google.com/#{gcp_project_id}"
