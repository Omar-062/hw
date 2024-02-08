FROM mcr.microsoft.com/mssql/server

ENV ACCEPT_EULA=Y
ENV SA_PASSWORD=QwertY123!

WORKDIR /usr/src/app

COPY ./schema.sql /usr/src/app/schema.sql

CMD /opt/mssql-tools/bin/sqlcmd -S database -U SA -P QwertY123! -d MinCrmDb -i /usr/src/app/schema.sql