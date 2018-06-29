defmodule Adellis.Repo.Migrations.CreateDemilitarizations do
  use Ecto.Migration

  def change do
    create table(:demilitarizations) do
      add :code, :string
      add :description, :text
    end
  end
end
