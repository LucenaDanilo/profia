# Usa uma imagem do Node.js para compilar o Next.js app
FROM node:18 AS build
WORKDIR /app

# Copie o package.json e o package-lock.json, se existir, para o diretório de trabalho
COPY package.json ./
COPY package-lock.json ./

# Copie todos os outros arquivos
COPY . .

RUN npm install
RUN npm run build

# Usa uma imagem de servidor leve para servir o Next.js app
FROM node:18-alpine
WORKDIR /app
COPY --from=build /app ./
EXPOSE 3000
CMD ["npm", "run", "start"]
