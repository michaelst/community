defmodule Community.GuardianTest do
  use Community.DataCase, async: true

  test "user is created if they don't exist yet" do
    assert {:ok,
            %Community.User{
              id: id,
              approved: false,
              firebase_id: "test-id"
            }} = Community.Guardian.resource_from_claims(%{"sub" => "test-id"})

    # same user is now returned
    assert {:ok,
            %Community.User{
              id: ^id,
              approved: false,
              firebase_id: "test-id"
            }} = Community.Guardian.resource_from_claims(%{"sub" => "test-id"})
  end
end
