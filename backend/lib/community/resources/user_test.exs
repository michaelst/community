defmodule Communiy.UserTest do
  use Community.DataCase, async: true

  alias Community.Api
  alias Community.User

  describe "user policies" do
    setup do
      admin =
        User
        |> Ash.Changeset.new()
        |> Ash.Changeset.for_create(:create, %{})
        |> Ash.Changeset.force_change_attribute(:firebase_id, "admin")
        |> Ash.Changeset.force_change_attribute(:admin, true)
        |> Api.create!()

      user =
        User
        |> Ash.Changeset.for_create(:create, %{})
        |> Ash.Changeset.force_change_attribute(:firebase_id, "user")
        |> Api.create!()

      {:ok, %{admin: admin, user: user}}
    end

    test "only admin can update a user", %{admin: admin, user: user} do
      assert {:error, %Ash.Error.Forbidden{}} =
               user
               |> Ash.Changeset.for_update(:update, %{approved: true})
               |> Api.update(actor: user)

      assert {:ok, %Community.User{approved: true}} =
               user
               |> Ash.Changeset.for_update(:update, %{approved: true})
               |> Api.update(actor: admin)
    end
  end
end
