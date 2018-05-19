defmodule AdellisWeb.Acceptance.QuoteTest do
  use Adellis.DataCase
  use Hound.Helpers

  hound_session()

  test "user can submit a quote with valid data" do
    navigate_to("/products")

    form = find_element(:id, "quote-form")

    find_within_element(form, :first_name, "quote[first_name]")
    |> fill_field("John")

    find_within_element(form, :last_name, "quote[last_name]")
    |> fill_field("Smith")

    # click on submit button
    find_within_element(form, :tag, "button")
    |> click

    assert current_path() == "/"

    message =
      find_element(:class, "uk-alert")
      |> visible_text()

    assert message == "Quote submitted successfully"
  end

  test "quote form shows error messages with invalid data" do
    navigate_to("/products")

    form = find_element(:id, "quote-form")
    # submit an empty form
    find_within_element(form, :tag, "button")

    assert current_path() == "/products"

    message =
      find_element(:class, "uk-alert")
      |> visible_text()

    assert message == "Check the form for errors"
  end
end
