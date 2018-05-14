defmodule AdellisWeb.Acceptance.HomepageTest do
  use ExUnit.Case
  use Hound.Helpers

  test "can navigate to product page" do
    navigate_to("/")
  end
end
