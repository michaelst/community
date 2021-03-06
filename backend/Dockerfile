FROM elixir:1.12-slim AS build

ENV MIX_ENV=prod \
    LANG=C.UTF-8

RUN apt-get update \
  && apt-get install -y --no-install-recommends build-essential software-properties-common \
  && rm -rf /var/lib/apt/lists/* \
  && mix local.hex --force \
  && mix local.rebar --force

WORKDIR /app

COPY mix.exs mix.lock ./
COPY config/config.exs config/prod.exs ./config/
RUN mix do deps.get --only prod, deps.compile

COPY lib lib
COPY priv priv
RUN mix compile

COPY config/runtime.exs ./config/
RUN mix release

FROM ubuntu:20.04 AS app

ENV LANG=C.UTF-8

RUN set -xe \
  && apt-get update \
  && apt-get -y upgrade \
  && apt-get install -y --no-install-recommends openssl \
  && useradd --create-home -u 1000 app \
  && rm -rf /var/lib/apt/lists/*

USER app
WORKDIR /home/app

COPY --from=build --chown=app:app /app/_build/prod/rel/community ./
COPY --chown=app:app entrypoint.sh .
CMD ["./entrypoint.sh"]
