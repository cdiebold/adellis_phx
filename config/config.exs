# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :adellis, ecto_repos: [Adellis.Repo]

config :adellis, Adellis.Mailer, adapter: Bamboo.TestAdapter

# Configures the endpoint
config :adellis, AdellisWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "wpIcnCF1kUzjv6cIVhBbh5OwqtZVkRmC/KuH6uGARZsr/AdDwRQo7FxOb/E1IXQv",
  render_errors: [view: AdellisWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Adellis.PubSub, adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:user_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
