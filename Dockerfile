# use the official Bun image
# # see all versions at https://hub.docker.com/r/oven/bun/tags
# FROM oven/bun:1.0 as base
# WORKDIR /usr/src/app
# RUN chmod -R 777 /usr/src/app

# # install dependencies into temp directory
# # this will cache them and speed up future builds
# FROM base AS install
# RUN mkdir -p /temp/dev
# COPY package.json bun.lockb /temp/dev/
# RUN cd /temp/dev && bun install --frozen-lockfile

# # install with --production (exclude devDependencies)
# RUN mkdir -p /temp/prod
# COPY package.json bun.lockb /temp/prod/
# COPY tsconfig.json ./
# RUN cd /temp/prod && bun install --frozen-lockfile --production

# # copy node_modules from temp directory
# # then copy all (non-ignored) project files into the image
# FROM base AS prerelease
# COPY --from=install /temp/dev/node_modules node_modules
# COPY ./src /usr/src/app
# COPY . .

# # [optional] tests & build
# ENV NODE_ENV=production
# RUN bun test
# RUN bun run build

# # copy production dependencies and source code into final image
# FROM base AS release
# COPY --from=install /temp/prod/node_modules node_modules
# COPY --from=prerelease /usr/src/app/index.ts src/index.ts
# COPY --from=prerelease /usr/src/app/src src
# COPY --from=prerelease /usr/src/app/package.json .

# # run the app
# USER bun
# EXPOSE 3000/tcp
# ENTRYPOINT [ "bun", "start" ]

FROM oven/bun:latest as development
WORKDIR /usr/src/app

COPY package*.json .

RUN bun install

COPY . ./

RUN bun run build

# Production
FROM oven/bun:latest as production

ARG NODE_ENV=production
ENV NODE_ENV={NODE_ENV}

WORKDIR /usr/src/app
COPY package*.json .

RUN bun install

COPY --from=development /usr/src/app/dist ./dist

CMD [ "bun", "dist/index.js" ]