defmodule Communiy.ResidentTest do
  use Community.DataCase, async: true

  alias Community.Api
  alias Community.Resident

  describe "user policies" do
    setup do
      admin =
        Resident
        |> Ash.Changeset.new()
        |> Ash.Changeset.for_create(:create, %{})
        |> Ash.Changeset.force_change_attribute(:firebase_id, "admin")
        |> Ash.Changeset.force_change_attribute(:admin, true)
        |> Api.create!()

      resident =
        Resident
        |> Ash.Changeset.for_create(:create, %{})
        |> Ash.Changeset.force_change_attribute(:firebase_id, "resident")
        |> Api.create!()

      {:ok, %{admin: admin, resident: resident}}
    end

    test "all residents can access current resident", %{resident: %{id: id} = resident} do
      assert {:ok, %{id: ^id}} = Api.read_one(Resident, action: :current_resident, actor: resident)
    end

    test "only admin can update a resident", %{admin: admin, resident: resident} do
      assert {:error, %Ash.Error.Forbidden{}} =
               resident
               |> Ash.Changeset.for_update(:update, %{approved: true})
               |> Api.update(actor: resident)

      assert {:ok, %Community.Resident{approved: true}} =
               resident
               |> Ash.Changeset.for_update(:update, %{approved: true})
               |> Api.update(actor: admin)
    end
  end
end
