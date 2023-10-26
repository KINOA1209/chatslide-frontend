cd ~/drlambda-frontend
# don't pull, restart only
# git pull

cd tailwindui
npm run build
pm2 restart tailwindui
