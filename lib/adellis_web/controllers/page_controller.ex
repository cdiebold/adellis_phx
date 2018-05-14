defmodule AdellisWeb.PageController do
  use AdellisWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
