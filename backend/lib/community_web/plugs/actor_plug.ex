defmodule CommunityWeb.ActorPlug do
  @behaviour Plug

  import Plug.Conn

  def init(opts), do: opts

  def call(conn, _) do
    actor = Guardian.Plug.current_resource(conn) |> IO.inspect
    put_private(conn, :absinthe, %{context: %{actor: actor}})
  end
end
