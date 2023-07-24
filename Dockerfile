FROM node:16-alpine3.16

WORKDIR /.

ENV PORT 5000
ARG DATABASE_URL
ENV DATABASE_URL ${DATABASE_URL}
ENV NODE_ENV production

COPY package*.json ./
COPY nest-cli.json nest-cli.json
COPY .eslintrc.js .eslintrc.js
COPY .prettierrc .prettierrc
COPY tsconfig.json tsconfig.json
COPY tsconfig.build.json tsconfig.build.json
COPY prisma prisma
COPY src src

RUN npm ci
RUN npx prisma generate
RUN npm run build

CMD npx prisma migrate deploy && npm run start:prod
