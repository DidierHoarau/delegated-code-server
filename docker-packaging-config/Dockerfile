FROM node:8-slim

EXPOSE 3000

WORKDIR /opt/app

COPY files /opt/app

CMD ["./node_modules/forever/bin/forever", "src/app.js"]
