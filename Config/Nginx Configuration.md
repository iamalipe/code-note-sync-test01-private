Create two separate config files:

**For React App (**`**/etc/nginx/sites-available/safalcalendar.com**`**):**

```Plain
server {
    server_name safalcalendar.com www.safalcalendar.com;

    root /var/www/SafalCalendar_FrontEnd_Production;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

**For Express API (**`**/etc/nginx/sites-available/api.safalcalendar.com**`**):**

```Plain
server {
    listen 80;
    server_name api.safalcalendar.com;

    location / {
        proxy_pass http://localhost:3005; # Your Express port
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

### 3. **Enable Configurations**

```Shell
sudo ln -s /etc/nginx/sites-available/safalcalendar.com /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/api.safalcalendar.com /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl restart nginx

sudo ln -s /etc/nginx/sites-available/dev.safalcalendar.com /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/api.dev.safalcalendar.com /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl restart nginx
```

### 4. **SSL Configuration (HTTPS)**

Install Certbot and get SSL certificates for both domains:

```Shell
sudo certbot --nginx -d dev.safalcalendar.com -d api.dev.safalcalendar.com
sudo certbot --nginx -d safalcalendar.com -d api.safalcalendar.com

sudo certbot --nginx -d api.safalcalendar.com

sudo certbot --nginx -d api.dev.safalutilities.com

sudo certbot certonly --force-renew -d api.dev.safalutilities.com -d dev.safalutilities.com

sudo certbot certonly --force-renew -d api.dev.safalmybuy.com -d dev.safalmybuy.com

```

  
sudo certbot --nginx -d [api.dev.safalutilities.com](http://api.dev.safalutilities.com/) -d [dev.safalutilities.com](http://dev.safalutilities.com/)

This will automatically:

  

```Plain
# /etc/nginx/sites-available/api.dev.safalcalendar.com
server {
    server_name api.dev.safalcalendar.com;

    location / {
        proxy_pass http://localhost:3001; # Your Express port
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

```Plain
# /etc/nginx/sites-available/dev.safalcalendar.com
server {
    server_name dev.safalcalendar.com www.dev.safalcalendar.com;

    root /var/www/safalutilities_dev;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

```Plain
# /etc/nginx/sites-available/safalmybuy.com

# safalmybuy.com
server {
    server_name safalmybuy.com www.safalmybuy.com;

    root /var/www/SafalMyBuy_FrontEnd_Production;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}

# api.safalmybuy.com
server {
    server_name api.safalmybuy.com;

    location / {
        proxy_pass http://localhost:3001; # Your Express port
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}

# /etc/nginx/sites-available/dev.safalmybuy.com

# dev.safalmybuy.com
server {
    server_name dev.safalmybuy.com;

    root /var/www/SafalMyBuy_FrontEnd_Production;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}

# dev-api.safalmybuy.com
server {
    server_name api.safalmybuy.com;

    location / {
        proxy_pass http://localhost:3000; # Your Express port
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```