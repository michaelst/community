defmodule Community.Notifiers.SendNotification do
  use Ash.Notifier

  def notify(%Ash.Notifier.Notification{
        resource: Community.Announcement,
        action: %{type: action},
        data: %{body: body, renter_viewable: true}
      })
      when action in [:create, :update] do
    Community.FCM.send_notification("resident-announcements", body)
  end

  def notify(%Ash.Notifier.Notification{
        resource: Community.Announcement,
        action: %{type: action},
        data: %{body: body}
      })
      when action in [:create, :update] do
    Community.FCM.send_notification("owner-announcements", body)
  end

  def notify(_notification) do
    :ok
  end
end
