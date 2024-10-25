# Usa uma imagem do Node.js para compilar o Next.js app
FROM node:18 AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Usa uma imagem de servidor leve para servir o Next.js app
FROM node:18-alpine
WORKDIR /app
COPY --from=build /public/my-app ./
EXPOSE 3000
CMD ["npm", "run", "start"]
