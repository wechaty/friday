# FROM wechaty/onbuild:next
FROM wechaty/wechaty:next

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

WORKDIR /bot

COPY package.json .
RUN jq 'del(.dependencies.wechaty)' package.json | sponge package.json \
    && rm -fr node_modules package-lock.json \
    && npm install \
    && sudo rm -fr /tmp/* ~/.npm
COPY . .
RUN npm run build

CMD [ "npm", "start" ]
