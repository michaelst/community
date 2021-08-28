defmodule Community.FCM do
  def client() do
    {:ok, %{token: token}} = Goth.fetch(Community.Goth)

    middleware = [
      {Tesla.Middleware.BaseUrl, "https://fcm.googleapis.com"},
      {Tesla.Middleware.BearerAuth, token: token},
      Tesla.Middleware.JSON
    ]

    {:ok, token}

    Tesla.client(middleware)
  end

  def send_notification(topic, body) do
    project_id = Application.fetch_env!(:community, :gcp_project_id)

    client()
    |> Tesla.post("v1/projects/#{project_id}/messages:send", %{
      message: %{
        topic: topic,
        notification: %{
          body: body
        },
        apns: %{
          payload: %{
            aps: %{
              sound: "default"
            }
          }
        }
      }
    })
  end
end
