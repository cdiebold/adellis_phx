defmodule AdellisWeb.Router do
  use AdellisWeb, :router

  pipeline :browser do
    plug(:accepts, ["html"])
    plug(:fetch_session)
    plug(:fetch_flash)
    plug(:protect_from_forgery)
    plug(:put_secure_browser_headers)
  end

  pipeline :api do
    plug(:accepts, ["json"])
  end

  scope "/", AdellisWeb do
    # Use the default browser stack
    pipe_through(:browser)

    get("/", PageController, :index)
    get("/about", PageController, :about)
    get("/contact", PageController, :contact)

    get("/products", ProductController, :index)

    post("/quote", QuoteController, :create)
  end

  # Other scopes may use custom stacks.
  # scope "/api", AdellisWeb do
  #   pipe_through :api
  # end
end
