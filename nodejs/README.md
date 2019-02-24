# Deploy a Basic Node.js App to Heroku
## Prerequisites
First, make sure to:
- set the port to `process.env.PORT` (see `main.js`)
- ignore `node_modules`
- set the start-up script to `start: "node main.js"` (see `package.json`)
- add a `Procfile` (example in `Procfile`)

## Deployment
```bash
heroku create
heroku git:remote -a <app_name>
git push heroku master
heroku open
```
