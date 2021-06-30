FROM public.ecr.aws/bitnami/node:10-prod

WORKDIR /usr/src/app
RUN mkdir media-manager shared-modules

COPY shared-modules shared-modules/
COPY package*.json server.js media-manager/

RUN cd shared-modules && for SHARED_MODULE in $(ls -d ./*); do cd $SHARED_MODULE && npm install && cd ..; done
RUN cd media-manager && npm install

ENV NODE_ENV=production
ENV NODE_CONFIG_DIR=/usr/src/app/shared-modules/config-helper/config/

CMD ["node", "./media-manager/server.js"]

EXPOSE 3006