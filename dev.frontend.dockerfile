
FROM node:18-alpine AS development 
ENV NODE_ENV development

RUN mkdir -p /frontend_app

WORKDIR /frontend_app

COPY hex-puzzle-too/package*.json ./

RUN npm install

COPY hex-puzzle-too/ .

EXPOSE 3000

CMD ["npm", "start"]

