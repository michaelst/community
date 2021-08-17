defmodule Community.Guardian do
  use Guardian, otp_app: :community

  alias Community.Api
  alias Community.Resident

  def subject_for_token(resource, _claims) do
    {:ok, resource.firebase_id}
  end

  def resource_from_claims(%{"sub" => firebase_id}) do
    Api.get(Resident, firebase_id: firebase_id)
    |> maybe_create_resident(firebase_id)
  end

  defp maybe_create_resident({:ok, %Resident{} = resident}, _firebase_id) do
    {:ok, resident}
  end

  defp maybe_create_resident({:ok, nil}, firebase_id) do
    Resident
    |> Ash.Changeset.for_create(:create, %{firebase_id: firebase_id})
    |> Ash.Changeset.force_change_attribute(:firebase_id, firebase_id)
    |> Api.create()
  end
end
