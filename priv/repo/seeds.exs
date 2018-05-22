# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Adellis.Repo.insert!(%Adellis.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias Adellis.Repo
alias Adellis.Catalog.Product

products = [
  %Product{
    nsn: 5_365_000_012_306,
    nsn_formatted: "5365-00-0012306",
    name: "SPACER, SLEEVE",
    item_name_code: 13207,
    type_of_item_identification_code: "K"
  },
  %Product{
    nsn: 6_685_000_041_672,
    nsn_formatted: "6685-00-0041672",
    name: "INDICATOR, HUMIDITY, CARD",
    item_name_code: 13474,
    type_of_item_identification_code: "1"
  },
  %Product{
    nsn: 5_365_000_012_999,
    nsn_formatted: "5365-00-0012999",
    name: "SPACER, FAKE",
    item_name_code: 13207,
    type_of_item_identification_code: "K"
  },
  %Product{
    nsn: 6_685_000_041_990,
    nsn_formatted: "6685-00-0041990",
    name: "INDICATOR, HUMIDITY, CARD, FAKE",
    item_name_code: 13474,
    type_of_item_identification_code: "1"
  },
  %Product{
    nsn: 5_365_000_012_991,
    nsn_formatted: "5365-00-0012991",
    name: "SPACER, BOLT, FAKE",
    item_name_code: 13207,
    type_of_item_identification_code: "K"
  },
  %Product{
    nsn: 6_685_000_041_993,
    nsn_formatted: "6685-00-0041993",
    name: "COMPUTER, FAKE",
    item_name_code: 13474,
    type_of_item_identification_code: "1"
  },
  %Product{
    nsn: 5_365_000_012_996,
    nsn_formatted: "5365-00-0012996",
    name: "SPACESHIP, FAKE",
    item_name_code: 13207,
    type_of_item_identification_code: "K"
  },
  %Product{
    nsn: 6_685_000_041_888,
    nsn_formatted: "6685-00-0041888",
    name: "CARD, MEMORY, FAKE",
    item_name_code: 13474,
    type_of_item_identification_code: "1"
  }
]

Enum.map(products, fn product -> Repo.insert!(product) end)
