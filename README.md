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
- `brew install nvm`
- register `nvm` into PATH if not as the shell instructs
- `nvm install 19.8.1`
- `nvm use 19.8.1`
- `npm install`


## Local Run and Test
- `npm run dev`

## Local Build
- `npm run build`: make sure to run this and see if the build passes before commiting

## Production Deployment
- `./prod_frontend.sh` on the prod server. You can trigger it from local or dev server too, but please refrain from doing so as it is computationally heavy for the dev server.

- The production build workload is offloaded to the dev server to avoid prod server from dying. The high level steps are:
  - a `curl` request is sent from the prod server to the dev server to download the latest frontend build (`/api/build_frontend`)
  - the backend on the dev server receives the request and trigger a run on the `build_frontend.sh` script
    - the script runs the build in `~/build/drlambda-frontend` directory, it pulls the latest head in master branch and calls `npm run build` and then compress the `.next` directory to a `latest-build.tar.gz` file which is in `~/build/drlambda-frontend/bin` directory
  - after the build is successful, dev server sends the binary file to prod server
  - after prod servers downloads the file, it decompresses it and move the `.next` directory to `~/drlambda-frontend/tailwindui/` and then restart pm2 to host it 

- To roll back to a previous build that has been historically served from prod server, you can check the archived snapshots stored in `~/drlambda-frontend/tailwindui/`, named as `.next.YYYYMMDDHHMMSS`.
  - The timestamp indicates when that snapshot was renamed from `.next` (current prod) to `.next.YYYYMMDDHHMMSS` (archived snapshot).
  - In addition to timestamp, you can also inspect the commit number to identify the version of that build. It is in the `metadata.json` file in each snapshot.
- When you find the target snapshot to roll back to, you should
  - rename the current `.next` to `.next.YYYYMMDDHHMMSS` to archive it
  - rename the target archive to `.next`
  - run `pm2 restart tailwindui` to restart server