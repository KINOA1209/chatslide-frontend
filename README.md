# DrLambda Frontend 

## Local Setup

If you have access to backend repo, follow the backend repo setup to run the backend locally.

Otherwise you can set up frontend locally, and connect to the dev backend at https://dev.drlambda.ai .
To do this, 
- put the content of `aws-exports.js` under tailwindui directory. The content can be requested. 

- `brew install nginx`
- `sudo cp nginx_mac_frontend_only.conf /usr/local/etc/nginx/nginx.conf` (in some cases the dest file is at `/opt/homebrew/etc/nginx/nginx.conf`, depending on `nginx -t` results)
- `sudo nginx -t`
- `brew services restart nginx`
- test if the backend is connected by going to http://localhost/api/test and see if there is result

- `cd tailwindui`
- `rew install nvm`
- `nvm install 19.8.1`
- `npm install`


## Local Run and Test
- `npm run dev`

## Local Build
- `npm run build`: make sure to run this and see if the build passes before commiting
