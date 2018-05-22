defmodule AdellisWeb.V1.ProductController do
  use AdellisWeb, :controller
  alias Adellis.Catalog

  def index(conn, _params) do
    products = Catalog.list_products()
    render(conn, "index.json", products: products)
  end
end
