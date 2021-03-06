# node-u2f-demo

Demo web app in node.js to help developers understand how FIDO U2F works under the hood. This app only focuses showing how U2F works and does not provide any guidance on how to implement user friendly second factor authentication workflows.

### Requirements

 * [npm](https://www.npmjs.com/)
 * [Google Chrome](https://www.google.com/chrome/browser/)
 * [YubiKey](https://www.yubico.com/product/fido-u2f-security-key/)

### Run it locally

    git clone https://github.com/outofjungle/node-u2f-demo.git
    cd node-u2f-demo/
    npm install
    npm start

### Considerations
  * The site should be running on a secure server (HTTPS)
    * This demo app uses insecure certificate for local testing
    * Heroku and GCP support both HTTP and HTTPS endpoints by default
      * http://yubikey-u2f-demo.appspot.com will load, but key registration will fail
    * Use [Let’s Encrypt](https://letsencrypt.org/) for valid certificates
  * The appId should match the url the server is running on

### TL;DR

The code is hosted at https://yubikey-u2f-demo.appspot.com. Feel free to play with registration/authentication of yubikeys. The U2F registration data is only stored in memory and will be wiped periodically. 
