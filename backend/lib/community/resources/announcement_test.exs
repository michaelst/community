defmodule Communiy.AnnouncementTest do
  use Community.DataCase, async: true

  alias Community.Announcement
  alias Community.Api
  alias Community.Resident

  describe "announcement policies" do
    setup do
      owner =
        Resident
        |> Ash.Changeset.for_create(:create, %{owner: true, approved: true})
        |> Ash.Changeset.force_change_attribute(:firebase_id, "owner")
        |> Api.create!()

      renter =
        Resident
        |> Ash.Changeset.for_create(:create, %{owner: false, approved: true})
        |> Ash.Changeset.force_change_attribute(:firebase_id, "renter")
        |> Api.create!()

      unapproved =
        Resident
        |> Ash.Changeset.for_create(:create, %{owner: false, approved: false})
        |> Ash.Changeset.force_change_attribute(:firebase_id, "unapproved")
        |> Api.create!()

      owner_announcment =
        Announcement
        |> Ash.Changeset.for_create(:create, %{body: "owner", renter_viewable: false})
        |> Api.create!()

      resident_announcment =
        Announcement
        |> Ash.Changeset.for_create(:create, %{body: "owner", renter_viewable: true})
        |> Api.create!()

      {:ok,
       %{
         owner: owner,
         renter: renter,
         unapproved: unapproved,
         owner_announcment: owner_announcment,
         resident_announcment: resident_announcment
       }}
    end

    test "notifications filtered correctly", %{
      owner: owner,
      renter: renter,
      unapproved: unapproved,
      owner_announcment: %{id: owner_announcement_id},
      resident_announcment: %{id: resident_announcement_id}
    } do
      assert {:ok,
              [
                %{id: ^owner_announcement_id},
                %{id: ^resident_announcement_id}
              ]} = Api.read(Announcement, actor: owner)

      assert {:ok,
              [
                %{id: ^resident_announcement_id}
              ]} = Api.read(Announcement, actor: renter)

      assert {:error, %Ash.Error.Forbidden{}} = Api.read(Announcement, actor: unapproved)
    end
  end
end
