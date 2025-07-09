# Dockerfile

# Gunakan image resmi nginx
FROM nginx:alpine

# Salin semua file ke dalam folder default nginx
COPY . /usr/share/nginx/html

# Port default nginx
EXPOSE 80
