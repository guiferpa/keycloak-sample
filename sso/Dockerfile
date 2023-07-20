FROM node:18 AS themer

WORKDIR /opt/app

COPY ./app/package.json ./app/yarn.lock /opt/app/

RUN yarn install --frozen-lockfile

COPY ./app/ /opt/app/

RUN yarn build-keycloak-theme

FROM quay.io/keycloak/keycloak:22.0 AS builder

WORKDIR /opt/keycloak

COPY --from=themer /opt/app/build_keycloak/target/keycloakify-starter-keycloak-theme-4.6.3.jar /opt/keycloak/providers/

RUN /opt/keycloak/bin/kc.sh build

FROM registry.access.redhat.com/ubi9 AS ubi-micro-build

RUN export XH_BINDIR=/usr/local/bin && curl -sfL https://raw.githubusercontent.com/ducaale/xh/master/install.sh | sh

FROM quay.io/keycloak/keycloak:22.0

COPY --from=builder /opt/keycloak/ /opt/keycloak/
COPY --from=ubi-micro-build /usr/local/bin/xh /usr/local/bin/xh

ENTRYPOINT [ "/opt/keycloak/bin/kc.sh" ]
