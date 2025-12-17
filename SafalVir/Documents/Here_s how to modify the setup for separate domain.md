Here’s a step-by-step guide to deploy a React app and Express app on an EC2 instance using Nginx:

### 1. **Set Up EC2 Instance**

- Launch an Ubuntu EC2 instance
- Connect via SSH: `ssh -i your-key.pem ubuntu@your-ec2-public-ip`
- Update packages:
    
    ```Shell
    sudo apt update && sudo apt upgrade -y
    ```
    

### 2. **Install Dependencies**

- Install Node.js & npm:
    
    ```Shell
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bashsource ~/.bashrc
    nvm install --lts
    ```
    
- Install Nginx:
    
    ```Shell
    sudo apt install nginx -y
    ```
    
- Install PM2 (process manager):
    
    ```Shell
    npm install -g pm2
    ```
    

### 3. **Deploy React App**

- Clone your React app repository
- Install dependencies and build:
    
    ```Shell
    npm install
    npm run build
    ```
    
- Create Nginx configuration (`/etc/nginx/sites-available/react-app`):
    
    ```Plain
    server {
      listen 80;
      server_name your-domain.com;
    
      root /path/to/react-app/build;
      index index.html;
    
      location / {
        try_files $uri $uri/ /index.html;
      }
    }
    ```
    

### 4. **Deploy Express App**

- Clone your Express app repository
- Install dependencies:
    
    ```Shell
    npm install
    ```
    
- Start with PM2:
    
    ```Shell
    pm2 start index.js --name "express-app"
    ```
    
- Save PM2 process list:
    
    ```Shell
    pm2 save
    pm2 startup
    ```
    

### 5. **Configure Nginx Reverse Proxy**

- Edit Nginx configuration (`/etc/nginx/sites-available/react-app`):
    
    ```Plain
    server {
      # ... previous React config ...
    
      location /api {
        proxy_pass http://localhost:3000; # Your Express app port
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
      }
    }
    ```
    

### 6. **Enable Configuration & Restart Nginx**

- Link config and test:
    
    ```Shell
    sudo ln -s /etc/nginx/sites-available/react-app /etc/nginx/sites-enabled/
    sudo nginx -tsudo systemctl restart nginx
    ```
    

### 7. **Configure Security Group**

- Allow inbound traffic for:
    - HTTP (80)
    - HTTPS (443)
    - SSH (22)

### 8. **Set Up Domain (Optional)**

- Configure DNS A record pointing to EC2 IP
- Install Certbot for SSL:
    
    ```Shell
    sudo apt install certbot python3-certbot-nginx
    sudo certbot --nginx
    ```
    

### 9. **Maintenance Commands**

- Check running apps:
    
    ```Shell
    pm2 list
    ```
    
- Nginx logs:
    
    ```Shell
    sudo tail -f /var/log/nginx/error.log
    ```
    
- Update deployments:
    
    ```Shell
    # Reactgit pull && npm install && npm run build
    # Expressgit pull && npm install
    pm2 restart express-app
    ```
    

**Key Notes:**  
1. Keep React build files in `build/` directory  
2. Express should listen on `localhost` (not 0.0.0.0)  
3. Use environment variables for sensitive data  
4. Consider using `.env` files for both apps  
5. Set up proper file permissions for Nginx (www-data user)

This setup provides:  
- React app served as static files  
- Express API available at /api endpoint  
- Automatic process management with PM2  
- Scalable architecture with Nginx reverse proxy

Here’s how to modify the setup for separate domains:

### 1. **DNS Configuration**

- Create two A records in your DNS provider:
    - `siperda.com` → EC2 public IP
    - `api.siperda.com` → EC2 public IP

### 2. **Nginx Configuration**

Create two separate config files:

**For React App (**`**/etc/nginx/sites-available/siperda.com**`**):**

```Plain
server {
    listen 80;
    server_name dev.safalutilities.com www.dev.safalutilities.com;

    root /home/ubuntu/SafalUtilities_FrontEnd/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

**For Express API (**`**/etc/nginx/sites-available/api.siperda.com**`**):**

```Plain
server {
    listen 80;
    server_name api.siperda.com;

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

### 3. **Enable Configurations**

```Shell
sudo ln -s /etc/nginx/sites-available/safalutilities.com /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/api.safalutilities.com /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl restart nginx
```

### 4. **SSL Configuration (HTTPS)**

Install Certbot and get SSL certificates for both domains:

```Shell
sudo certbot --nginx -d siperda.com -d www.siperda.com -d api.siperda.com
```

This will automatically:  
1. Obtain SSL certificates from Let’s Encrypt  
2. Modify Nginx configs to use HTTPS  
3. Set up automatic certificate renewal

### 5. **Express App Configuration**

Ensure your Express app is configured to:  
1. Listen on localhost:3000  
2. Use proper CORS headers (if needed):

```JavaScript
const cors = require('cors');app.use(cors({
  origin: ['https://siperda.com', 'https://www.siperda.com']
}));
```

### 6. **React App Configuration**

Update your React app’s API calls to use the API domain:

```JavaScript
// In your .env fileREACT_APP_API_URL=https://api.siperda.com// In your API callsaxios.get(`${process.env.REACT_APP_API_URL}/your-endpoint`)
```

### 7. **Final Nginx Configs After SSL**

Your auto-generated SSL configs will look like this:

**siperda.com:**

```Plain
server {
    listen 443 ssl;
    server_name siperda.com www.siperda.com;

    ssl_certificate /etc/letsencrypt/live/siperda.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/siperda.com/privkey.pem;

    # ... rest of React config ...
}

server {
    listen 80;
    server_name siperda.com www.siperda.com;
    return 301 https://$host$request_uri;
}
```

**api.siperda.com:**

```Plain
server {
    listen 443 ssl;
    server_name api.siperda.com;

    ssl_certificate /etc/letsencrypt/live/api.siperda.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.siperda.com/privkey.pem;

    # ... rest of API proxy config ...
}

server {
    listen 80;
    server_name api.siperda.com;
    return 301 https://$host$request_uri;
}
```

### 8. **Verify Deployment**

- Visit `https://siperda.com` - should show React app
- Visit `https://api.siperda.com/health-check` - should show API response
- Check SSL certificates: 🔒 icon in browser address bar

### Maintenance Tips:

1. Renew certificates automatically:
    
    ```Shell
    sudo certbot renew --dry-run
    ```
    
2. Update deployments:
    
    ```Shell
    # Reactcd /path/to/react-app
    git pull && npm install && npm run build
    # Expresscd /path/to/express-app
    git pull && npm install
    pm2 restart express-app
    ```
    

This setup provides:  
- Clean separation between frontend and API  
- Proper HTTPS encryption  
- Scalable architecture  
- Separate domains for better organization  
- Automatic certificate renewal