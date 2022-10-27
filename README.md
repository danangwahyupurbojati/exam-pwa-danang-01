## General Information

This is SwiftPWA base project bootstrapped with [Next.js](https://nextjs.org/).

Demo: [https://pwa.getswift.asia/](https://pwa.getswift.asia/)

Roadmap: [Click here](https://bit.ly/swift-timeline)

Release Note: [Click here](https://github.com/icubeus/swift-pwa/releases)

Latest Stable Version branch: `master` (for more version, please check tags)

Development branch: `develop-v2`

Launching Checklist:
- [Full PWA mode Checklist](https://teamwork.icubeonline.com/#/projects/120618/notebooks/354196) 
- [Checkout Only / PWA Checkout mode Checklist](https://teamwork.icubeonline.com/#/projects/120618/notebooks/362538) 

## Requirements
- NodeJS v14 or higher

## Pre-Installation
### Setup Host and Graphql Endpoint
1. Open file [swift.config.js](swift.config.js)
2. Edit the host of each environment at thes lines:
```
const HOST = {
    local: 'http://localhost:3000'
    dev: '[dev url]',
    stage: '[stage url]',
    prod: '[prod url]',
};
```
3. Edit GraphQl endpoint of each environment at these lines:
```
const graphqlEndpoint = {
    local: '[gql endpoint for local]'
    dev: '[gql endpoint for dev]',
    stage: '[gql endpoint for stage]',
    prod: '[gql endpoint for prod]',
};
```

## Installation
You can run SwiftPWA with or without docker.
### Without Docker
#### Dev mode
1. Build static assets (do once only for the first time)
```
npm run assets:build
# or
yarn assets:build
```
2. Run it (sample for local environment):
```bash
npm run local
# or
yarn local
``` 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:bulb: Please find more commands for another environments in [package.json](package.json)  

3. Open [http://localhost:3000](http://localhost:3000) on browser to see the frontend.

#### Prod mode
1. Build the static assets and the project
```bash
npm run build
# or
yarn build
```
2. Run it (sample for local environment):
```bash
npm run local:start
# or
yarn local:start
```
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:bulb: Please find more commands for another environments in [package.json](package.json)  

3. Open [http://localhost:3000](http://localhost:3000) on browser to see the frontend.

### With Docker
#### Local environment (dev mode): 
1. build: `docker-compose -f ./docker/local/docker-compose.yml build`
2. run: `docker-compose -f ./docker/local/docker-compose.yml up`


Alternatively, build and run in one step: `docker-compose -f ./docker/local/docker-compose.yml up --build`


#### Dev environment (prod mode): 
1. build: `docker-compose -f ./docker/dev/docker-compose.yml build`
2. run: `docker-compose -f ./docker/dev/docker-compose.yml up`

Alternatively, build and run in one step: `docker-compose -f ./docker/dev/docker-compose.yml up --build`

#### Prod environment (prod mode):
1. build: `docker-compose build`
2. run: `docker-composer up`

Alternatively, build and run in one step: `docker-compose up --build`

## The SwiftPWA Cores
### Modules
Click [here](core/modules/README.md) for more detail.
### Helpers
Click [here](core/helpers/readme.md) for more detail.
### Libraries
Click [here](core/lib/readme.md) for more detail.
### Public
Click [here](core/public/readme.md) for more detail.

# Overriding
Do not ever touch files under under [core](core) folder!
Do override in [src](src) folder instead!

# PWA Config
Since version 2.5.0 Swift PWA must be get any config from graphql where config can be change from backoffice magento. Detail documentation can be read at [here](https://docs.google.com/document/d/1DaZhkHjANgPfISH8eHS7T2njNCQhty1uORHTZ9fYIDk)

# Note for version <= 2.4.9

## Homepage Setup
By default, Swift PWA comes with hardcode contents which are sliders, highlighted products list, and highlighted categories.
But we recommend to use CMS Page instead.
To do so please follow this step:
1. Download the sample CMS page from [here](sample/pwa-homepage.csv), then upload/import on Magento backoffice using Firebear feature
2. Update the Swift PWA swift.config.js
    - home ▸ useCmsPage ▸ enable = true
    - home ▸ useCmsPage ▸ identifier = "pwa-homepage" or any CMS identifier you created for PWA Homepage.



# Patches
### How to apply patch file for swift pwa project

1. copy file .patch to folder `./patches`
2. edit file `patch.sh`
3. add list file patch beetweek delimiter text `"Start of line patch"` and `"END of line patch"`
4. example code patch.sh after edit like here
```
...
######################### START of line patch ############################
patch -p1 --forward < patches/fix_loadmore_plp.patch || true
######################### END of line patch ##############################

```

# Authorization Key
Authorization key is a key that retrieved from Backoffice to get sensitive PWA configurations such as traveloka API key, xendit key, paypal key, etc.
### How to get authorization key for Swift PWA project

1. Open backoffice
2. Click on systems menu
3. Click on integrations menu
4. Click on add new integration
5. Fill in the name and current user identity verification (this is backoffice account/admin password)
6. On the API section, select resource access to "All"
7. Click save
8. And then on the Integrations list, click "Activate" on the key you just created
9. Click Allow
10. Copy the "Access Token" part
11. Open `package.json` file and add the key on each start command on the scripts section like this `ACCESS_KEY=[your access token]` or you can look at the example directly from `package.json` file
```
"scripts": {
    "assets:build": "webpack",
    "local": "cross-env APP_ENV=local NODE_ENV=development ACCESS_KEY=z42nzj61mfsbe5ys0qo2h5vha1icxe5a node server.js",
    "local:start": "cross-env APP_ENV=local NODE_ENV=production ACCESS_KEY=z42nzj61mfsbe5ys0qo2h5vha1icxe5a node server.js",
    "dev": "cross-env APP_ENV=dev NODE_ENV=development node --max-http-header-size=16384 server.js",
    "dev:start": "cross-env APP_ENV=dev NODE_ENV=production NODE_TLS_REJECT_UNAUTHORIZED=0 ACCESS_KEY=z42nzj61mfsbe5ys0qo2h5vha1icxe5a node --max-http-header-size=16384 server.js",
    "stage": "cross-env APP_ENV=stage NODE_ENV=development ACCESS_KEY=z42nzj61mfsbe5ys0qo2h5vha1icxe5a node --max-http-header-size=16384 server.js",
    "stage:start": "cross-env APP_ENV=stage NODE_ENV=production NODE_TLS_REJECT_UNAUTHORIZED=0 ACCESS_KEY=z42nzj61mfsbe5ys0qo2h5vha1icxe5a node --max-http-header-size=16384 server.js",
    "prod": "cross-env APP_ENV=prod NODE_ENV=development ACCESS_KEY=z42nzj61mfsbe5ys0qo2h5vha1icxe5a node --max-http-header-size=16384 server.js",
    "prod:start": "cross-env APP_ENV=prod NODE_ENV=production NODE_TLS_REJECT_UNAUTHORIZED=0 ACCESS_KEY=z42nzj61mfsbe5ys0qo2h5vha1icxe5a node --max-http-header-size=16384 server.js",
    "pretest": "./node_modules/.bin/eslint --ignore-path .gitignore . --fix",
    "start": "cross-env node --max-http-header-size=16384 server.js",
    "generate-certs": "mkdir certs && openssl req -x509 -days 365 -newkey rsa:2048 -nodes -sha256 -keyout certs/privateKey.key -out certs/certificate.crt",
    "build": "concurrently \"yarn assets:build\" \"next build\"",
    "export": "next export",
    "clean": "cross-env rimraf ./.next ./out",
    "release": "cross-env NODE_ENV=production npm run clean && npm run build && npm run export",
    "test": "jest --watch",
    "test:ci": "jest --ci"
  },
```
