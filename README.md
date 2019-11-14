This application requires node. If you need to install node, follow the instructions below...

Install node version manager
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash

Add the following 3 lines to your ~/.bashrc
export NVM_DIR="$HOME/.config"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

Install node using nvm
nvm install node

For more information, checkout the link below
https://linuxize.com/post/how-to-install-node-js-on-raspberry-pi/

To bootstrap any node application just run the following commands...
$ npx license mit > LICENSE
$ npx gitignore node
$ npm init -y

To be able to compile and install native add-ons from the npm registry you need to install the development tools:
$ sudo apt install build-essential

If this is freshly cloned from github then run...
$ npm install

To run the application...
$ sudo node app.js



