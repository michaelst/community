defmodule Community.Guardian do
  use Guardian, otp_app: :community

  alias Community.Api
  alias Community.User

  def subject_for_token(resource, _claims) do
    {:ok, resource.firebase_id}
  end

  def resource_from_claims(%{"sub" => firebase_id}) do
    Api.get(User, [firebase_id: firebase_id])
  end

  def resource_from_claims(_claims) do
    {:error, :reason_for_error}
  end
end
