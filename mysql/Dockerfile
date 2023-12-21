FROM mysql:8.0

COPY . ./

RUN mv /init-scripts/*.sql /docker-entrypoint-initdb.d