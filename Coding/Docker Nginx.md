docker-compose.yml

```YAML
version: "3.8"services:  nginx:    image: nginx:latest    container_name: nginx-server    ports:      - "80:80"    volumes:      - ./nginx.conf:/etc/nginx/nginx.conf:ro      - ./html-app-01:/usr/share/nginx/html/html-app-01:ro      - ./html-app-02:/usr/share/nginx/html/html-app-02:ro      - ./html-app-03:/usr/share/nginx/html/html-app-03:ro    restart: alwaysnetworks:  default:    driver: bridge
```

nginx.conf

```TOML
worker_processes auto;events {  worker_connections 1024;}http {  server {    listen 80;    # Hosting html-app-01    location /html-app-01 {      alias /usr/share/nginx/html/html-app-01;      index index.html;    }    # Hosting html-app-02    location /html-app-02 {      alias /usr/share/nginx/html/html-app-02;      index index.html;    }    # Hosting html-app-03    location /html-app-03 {      alias /usr/share/nginx/html/html-app-03;      index index.html;    }  }}
```

docker-compose up -d  
http://localhost/html-app-01  
http://localhost/html-app-02  
http://localhost/html-app-03