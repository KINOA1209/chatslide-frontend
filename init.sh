#!/bin/bash

echo "Installing Node.js"
# install nvm first
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
# let nvm be recognizable
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
# then use nvm to install npm
nvm install 19.8.1
# npm install next react react-dom react-router-dom encoding firebase
# sudo npm install -g pm2
curl -sL https://aws-amplify.github.io/amplify-cli/install | bash

echo "Running npm"
cd ~
# git clone git@github.com:drlambda-ai/drlambda-frontend.git
cp drlambda-config/drlambda/tailwindui/aws-exports.js drlambda-frontend/tailwindui/aws-exports.js
cd ~/drlambda-frontend/tailwindui
# put git ignored files into this directory
npm install
npm run build
# install pm2 and run
npm install -g pm2
pm2 start npm --name "tailwindui" -- start  ## NOTE: this has to be run every time EC2 restarts
