# Etapa 1: Construir a aplicação
FROM node:16 AS build

# Definir o diretório de trabalho no contêiner
WORKDIR /app

# Copiar o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instalar as dependências do projeto
RUN npm install

# Copiar o restante do código do aplicativo para o diretório de trabalho
COPY . .

# Construir a aplicação para produção
RUN npm run build

# Etapa 2: Servir a aplicação
FROM nginx:alpine

# Copiar os arquivos de build da etapa anterior para o diretório padrão do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar o arquivo de configuração do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expor a porta que o Nginx usará
EXPOSE 80

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
