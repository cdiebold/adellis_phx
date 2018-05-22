defmodule AdellisWeb.Acceptance.HomepageTest do
  use ExUnit.Case
  use Hound.Helpers

  hound_session()

  test "can navigate to product page using navbar" do
    navigate_to("/")

    navbar = find_element(:tag, "nav")

    find_within_element(navbar, :link_text, "PRODUCTS")
    |> click()

    assert current_url() =~ "/products"
  end

  test "can navigate to product page from click on browse product button" do
    navigate_to("/")
    find_element(:class, "custom-btn") |> click()
    assert current_url() =~ "/products"
  end

  test "can navigate to the about page using navbar" do
    navigate_to("/")

    navbar = find_element(:tag, "nav")

    find_within_element(navbar, :link_text, "ABOUT")
    |> click()

    assert current_url() =~ "/about"
  end

  test "can navigate to the contact page using navbar" do
    navigate_to("/")

    navbar = find_element(:tag, "nav")

    find_within_element(navbar, :link_text, "CONTACT")
    |> click()

    assert current_url() =~ "/contact"
  end
end
