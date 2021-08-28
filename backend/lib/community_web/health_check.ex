defmodule CommunityWeb.HealthCheck do
  import Plug.Conn

  @type options :: [resp_body: String.t()]

  @resp_body "ok"

  @spec init(options) :: options
  def init(opts \\ []) do
    [resp_body: opts[:resp_body] || @resp_body]
  end

  @spec call(Plug.Conn.t(), options) :: Plug.Conn.t()
  def call(%Plug.Conn{} = conn, opts) do
    send_resp(conn, 200, opts[:resp_body])
  end
end
