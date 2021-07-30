defmodule Community.Repo do
  use AshPostgres.Repo,
    otp_app: :community
end
