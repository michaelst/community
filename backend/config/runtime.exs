import Config

config :community, Community.Guardian, issuer: "https://securetoken.google.com/#{System.get_env("GCP_PROJECT_ID")}"
