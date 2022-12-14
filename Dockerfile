FROM node:16.15.0
WORKDIR /app
ENV TZ="Asia/Shanghai"
COPY . .
RUN npm install --registry=https://registry.npm.taobao.org
RUN npm run build
RUN npm prune --production
EXPOSE 7000
ENTRYPOINT ["npm", "run", "start"]
