defmodule Community.Resident.Changes.ApproveAppReviewer do
  use Ash.Resource.Change

  def change(changeset, _opts, _context) do
    account_number = Ash.Changeset.get_attribute(changeset, :account_number)
    app_reviewer_password = Application.fetch_env!(:community, :app_reviewer_password)

    if account_number == app_reviewer_password do
      Ash.Changeset.change_attribute(changeset, :approved, true)
    else
      changeset
    end
  end
end
