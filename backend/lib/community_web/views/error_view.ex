defmodule CommunityWeb.ErrorView do
  use CommunityWeb, :view

  # If you want to customize a particular status code
  # for a certain format, you may uncomment below.
  # def render("500.json", _assigns) do
  #   %{errors: %{detail: "Internal Server Error"}}
  # end

  # By default, Phoenix returns the status message from
  # the template name. For example, "404.json" becomes
  # "Not Found".
  def template_not_found(template, _assigns) do
    %{errors: %{detail: Phoenix.Controller.status_message_from_template(template)}}
  end
end

defimpl AshGraphql.Error, for: Ash.Error.Forbidden do
  def to_error(_error) do
    %{
      message: "Forbidden",
      code: "forbidden"
    }
  end
end

defimpl AshGraphql.Error, for: Ash.Error.Query.ReadActionRequiresActor do
  def to_error(_error) do
    %{
      message: "Forbidden",
      code: "forbidden"
    }
  end
end
