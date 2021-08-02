defmodule Community.Guardian do
  use Guardian, otp_app: :community

  alias Community.Api
  alias Community.User

  def subject_for_token(resource, _claims) do
    {:ok, resource.firebase_id}
  end

  def resource_from_claims(%{"sub" => firebase_id}) do
    Api.get(User, [firebase_id: firebase_id])
    |> maybe_create_user(firebase_id)
  end

  def resource_from_claims(_claims) do
    {:error, :reason_for_error}
  end

  defp maybe_create_user({:ok, %User{} = user}, _firebase_id) do
    {:ok, user}
  end

  defp maybe_create_user({:ok, nil}, firebase_id) do
    User
    |> Ash.Changeset.for_create(:create, %{firebase_id: firebase_id})
    |> Ash.Changeset.force_change_attribute(:firebase_id, firebase_id)
    |> Api.create()
  end
end
