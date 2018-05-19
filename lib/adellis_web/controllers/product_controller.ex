defmodule AdellisWeb.ProductController do
  use AdellisWeb, :controller

  alias Adellis.Sales

  def index(conn, _params) do
    changeset = Sales.build_quote()
    render(conn, "index.html", changeset: changeset)
  end
end
