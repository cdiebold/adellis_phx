defmodule Adellis.Factory do
  use ExMachina.Ecto, repo: Adellis.Repo

  alias Adellis.Catalog.Product

  def product_factory do
    %Product{
      nsn: Enum.random(100..1_000_000_000) |> to_string(),
      # will generate name0, name1,....
      name: sequence("name"),
      nsn_formatted: Enum.random(100..1_000_000) |> to_string(),
      type_of_item_identification_code: sequence("be1"),
      item_name_code: 12
    }
  end
end
