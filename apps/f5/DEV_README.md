### Development
Fetch code and start dev server.
```sh
git clone https://github.com/prmichaelsen/parm.git
```

Install dependencies.
```sh
npm i
```

You will need run some utlity scripts to setup your environment before it will build correctly.
The ultility scripts depend on `ts-node`, so you will need to install `ts-node` as a global dependency in order to run them.

If this is your first time using `npm`, you should probably set your npm `prefix` in your `config` to a sub-directory of your `$HOME` (or shorthand, `~`).

See [this stack overflow post](https://stackoverflow.com/questions/54802330/missing-write-access-in-mac-to-usr-local-lib-node-modules) for an explanation why you would do this.

```sh
mkdir ~/.npm-global;
npm config set prefix '~/.npm-global';
touch ~/.profile;
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.profile;
source ~/.profile;
```

> on a unix-like system: touch creates a file, echo ... >> ... appends to a file, source (or shorthand, `.`) loads the .profile configuration into your current terminal session, and ~/.profile is a special config file that is loaded each time a terminal session is initiated

Now, install `ts-node` globally via:
```sh
npm i -g ts-node
```

You'll need some "admin secrets", reach out to me if you want to run this locally and I can work with you.

Alternatively, you may supply your own secrets to run your own admin database. As of 2021 Jul, no one has done that, so update this document accordingly with your learnings.

Once you have the admin secrets, you will fetch additional "service secrets" secrets from the secret vault.
```sh
./tools/scripts/f5/fetch-secrets.ts
```
This file uses a shebang to set the "intepreter" to ts-node so you can run a .ts 
file as though typescript was running through an intepreter without having to 
transpile to javascript first. 📸

To prepare app `parm` for dev we must first `pre-bundle` it. This configures
some options in the `workspace.json` and creates some additional source
files with some application metadata.
```sh
./tools/scripts/f5/0-deploy.ts parm pre-bundle
```

We also need to generate an `index.local.html` for local dev.
```sh
./tools/scripts/f5/0-deploy.ts parm post-bundle
```

Now we're ready to start the app (finally).

Run a specific app for local development:
```sh
npm run nx run f5:serve:parm
```
This notation runs the `serve` architect for the `f5` application using the `parm` configuration.
To see the architects and configs avaiable, view the `workspace.json` at the root of this repository.
For information on a `workspace.json`, refer to the official `nx` documenation.

For more dev info, see [DEV_README](./DEV_README.md).

### Troubleshooting
#### no index.local.html found
> ✖ ｢wdm｣: Error: ENOENT: no such file or directory, open '/Volumes/LaCie 1/_workplace/parm2/apps/f5/src/index.local.html'

This means you tried to run 
```sh
npm run nx run f5:serve:parm
``` 
without first running
```sh
./tools/scripts/f5/0-deploy.ts parm post-bundle
```

## Deployment
Login with firebase. Then:
```sh
firebase use --add parm-app
```

Now, deploy an f5 app:
```sh
./tools/scripts/f5/0-deploy.ts APP_NAME
```

This script:
* pulls the live config for each app from firestore
* bundles the apps
* updates the dist with some assets
* deploys to firebase hosting 

### Data Backup
See `./tools/scripts/f5/backup.ts` for a method to download all firestore data.
