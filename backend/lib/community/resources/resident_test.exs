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

    test "only admin can approve a resident", %{admin: admin, resident: resident} do
      assert {:error, %Ash.Error.Forbidden{}} =
               resident
               |> Ash.Changeset.for_update(:update, %{approved: true})
               |> Api.update(actor: resident)

      assert {:ok, %Community.Resident{approved: true}} =
               resident
               |> Ash.Changeset.for_update(:update, %{approved: true})
               |> Api.update(actor: admin)
    end

    test "resident can only update certain fields", %{resident: resident} do
      assert {:error,
              %Ash.Error.Invalid{
                errors: [
                  %Ash.Error.Changes.InvalidAttribute{field: :owner, message: "cannot be changed"},
                  %Ash.Error.Changes.InvalidAttribute{field: :approved, message: "cannot be changed"},
                  %Ash.Error.Changes.InvalidAttribute{field: :admin, message: "cannot be changed"}
                ]
              }} =
               resident
               |> Ash.Changeset.for_update(:update_profile, %{
                 admin: true,
                 approved: true,
                 owner: true
               })
               |> Api.update(actor: resident)

      assert {:ok, %Community.Resident{name: "Michael", unit: "1", account_number: "12345", approved: false}} =
               resident
               |> Ash.Changeset.for_update(:update_profile, %{
                 name: "Michael",
                 unit: "1",
                 account_number: "12345"
               })
               |> Api.update(actor: resident)
    end

    test "app reviewer password auto approves resident", %{resident: resident} do
      assert {:ok, %Community.Resident{approved: true}} =
               resident
               |> Ash.Changeset.for_update(:update_profile, %{
                 account_number: "password"
               })
               |> Api.update(actor: resident)
    end
  end
end
