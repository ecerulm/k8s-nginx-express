# Cheatsheet on how to direct/forward/proxy traffic from nginx to express/node

Start express with

```
cd ./express
npm install 
npm run serve
```

You can check express.js is serving with 

```
curl http://localhost:5000
```


Start nginx with `./nginx/start_nginx.sh`. 
* It will listen to port 8080
* It will serve http://localhost:8080/index.html from `./nginx/html/`
* It will forward requests to http://localhost:8080/express/ to express running on `http://127.0.0.1:5000` (it will return `views: XX`)


You can check that nginx is forwarding  / proxying traffic with 

```
curl -w "\n" http://localhost:8080/express
```

# nginx.conf

The important bit is 

```
        location /express {
            
            proxy_pass http://127.0.0.1:5000/;
            proxy_redirect off;

            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
```

in `./nginx/nging.conf.template` where it indicated that path `/express/XXXX` will be proxied to `http://127.0.0.1:5000/`. In principle if you request `/express/aaa/bbb/ccc` to nginx it will be proxied to `http://127.0.0.1:5000/aaa/bbb/ccc` (Notice that the `/express` is gone from the URL in the express side)