defmodule Adellis.Catalog do
  alias Adellis.Repo
  alias Adellis.Catalog.Product

  def list_products do
    Product |> Repo.all()
  end
end
