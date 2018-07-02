Creating new component on node
https://medium.com/dailyjs/building-a-react-component-with-webpack-publish-to-npm-deploy-to-github-guide-6927f60b3220
https://docs.npmjs.com/getting-started/installing-node

package.json
{
  "name": "mkhancha-bbheader",
  "version": "1.0.1",
  "description": "bbheader",
  "main": "dist/index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack-dev-server --mode development",
    "transpile": "babel src -d dist --copy-files",
    "prepublishOnly": "npm run transpile",
    "build": "webpack --mode production",
    "deploy": "gh-pages -d examples/dist",
    "publish-demo": "npm run build && npm run deploy"
  },
  "author": "Manish Khanchandani",
  "license": "ISC",
  "peerDependencies": {
    "react": "^16.3.0",
    "react-dom": "^16.3.0"
  },
  "devDependencies": {
    "babel-cli": "^6.26.0",
    "babel-core": "^6.26.3",
    "babel-loader": "^7.1.4",
    "babel-preset-env": "^1.7.0",
    "babel-preset-react": "^6.24.1",
    "css-loader": "^0.28.11",
    "gh-pages": "^1.2.0",
    "html-webpack-plugin": "^3.2.0",
    "react": "^16.4.1",
    "react-dom": "^16.4.1",
    "style-loader": "^0.21.0",
    "webpack": "^4.13.0",
    "webpack-cli": "^3.0.8",
    "webpack-dev-server": "^3.1.4"
  },
  "dependencies": {
    "react-bootstrap": "^0.32.1"
  }
}



.babelrc
{
  "presets": ["env", "react"]
}

.gitignore

# .gitignore
node_modules
dist


webpack.config.js
/*** webpack.config.js ***/
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, "examples/src/index.html"),
    filename: "./index.html"
});
module.exports = {
    entry: path.join(__dirname, "examples/src/index.js"),
    output: {
        path: path.join(__dirname, "examples/dist"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    plugins: [htmlWebpackPlugin],
    resolve: {
        extensions: [".js", ".jsx"]
    },
    devServer: {
        port: 3001
    }
};

# .npmignore 
src
examples
.babelrc
.gitignore
webpack.config.js

Run
npm start
npm run transpile
npm run build

npm publish



/*if (!this.props.config) return;
		if (!this.props.FirebaseConstant) return;
		const FirebaseConstant = this.props.FirebaseConstant;
		const config = this.props.config;*/
		let fb_path = '';
if (process.env.NODE_ENV === 'development') {
	fb_path = '/babybarv2';
} else {
	fb_path = '/babybarv2_live';
}

 const config = {
    apiKey: "AIzaSyBhpHK-ve2s0ynnr8og8Zx0S69ttEFpDKk",
	authDomain: "project100-fe20e.firebaseapp.com",
	databaseURL: "https://project100-fe20e.firebaseio.com",
	projectId: "project100-fe20e",
	storageBucket: "project100-fe20e.appspot.com",
	messagingSenderId: "674827815611"
  };

 const FirebaseConstant = {
	basePath: fb_path
};