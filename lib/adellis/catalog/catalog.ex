defmodule Adellis.Catalog do
  alias Adellis.Repo
  alias Adellis.Catalog.Product
  import Ecto.Query

  def list_products do
    Product |> Repo.all()
  end

  def get_product(nsn) do
    #  Repo.one(from: p in "products", where: p.nsn = nsn)
  end
end
