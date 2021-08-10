import { App } from './interface';
import { 
  environment, writeJson, resolve
} from './util';

import * as fs from 'fs';
import * as nunjucks from 'nunjucks';
import * as mkdirp from 'mkdirp';
import { firebase } from './firebase';

nunjucks.configure({
  autoescape: false,
});

const downloadFile = async ({
  writePath,
  storagePath,
  bucket,
  appName,
  localAppDir,
}) => {
  // write file
  const options = {
    destination: resolve(`${writePath}/${storagePath}`),
  };

  // await firebase
  // (writes to file specified by 'options')
  const fileRef = await firebase()
    .storage()
    .bucket(bucket)
    .file(`${localAppDir}/${storagePath}`)
    ;
  if (fileRef.exists()) {
    await fileRef.download(options);
    return true;
  } else {
    return false;
  }
};

const writeStorage = async ({
  /** local path to write to */
  writePath,
  /** remote path */
  storagePath,
  /** bucket name, in form `${project-id-from-secrets-json}.appspot.com*/
  bucket,
  /** app name as specified by environment, 
   * aka `apps/f5/src/environments/${app-name}.ts*/
  appName
}) => {
  const success = downloadFile({
    writePath, storagePath, bucket,
    appName, localAppDir: appName
  });
  if (success) {
    return true;
  }
  const downloadDefaultSuccess = downloadFile({
    writePath, storagePath, bucket, 
    appName: 'default', localAppDir: appName
  });
  return downloadDefaultSuccess;
}

export const postBundle = async (appNames = []) => {
  const env = environment();
  const collection = `${env}.parm.f5.apps`;

  const e = await firebase()
    .firestore()
    .collection(collection)
    .get();

  const apps: App[] = e.docs.map(d => d.data() as App);
  apps
    .filter(app => appNames.some(name => app.app === name))
    .forEach(async app => {
      console.log(`post-bundling ${app.app}...`);
      const dist = resolve(`./dist/apps/${app.app}`);
      const src = resolve(`./apps/f5/src/`);
      mkdirp.sync(dist);

      // grab favico
      const bucket = `parm-app.appspot.com`;
      const faviconUrl = `favicon.ico`;
      
      /** write for deployment */
      await writeStorage({
        writePath: dist,
        storagePath: 'favicon.ico',
        bucket,
        appName: app.app,
      });
      /** write for local dev */
      await writeStorage({
        writePath: src,
        storagePath: 'favicon.ico',
        bucket,
        appName: app.app,
      });
      /** write for deployment */
      await writeStorage({
        writePath: dist,
        storagePath: `meta.image.png`,
        bucket,
        appName: app.app,
      });
      /** write for local dev */
      await writeStorage({
        writePath: src,
        storagePath: 'meta.image.png',
        bucket,
        appName: app.app,
      });

      // write index.html
      (() => {
        const distWt = resolve(dist + `/index.html`);
        const localWt = resolve(src + `/index.local.html`);
        const file = nunjucks.render('./templates/index.njk', {
          faviconUrl,
          ...app,
        });
        fs.writeFileSync(distWt, file, 'utf8');
        fs.writeFileSync(localWt, file, 'utf8');
      })();

      // update the firebase.json
      (() => {
        const fb = require('../../../firebase.json');
        const hostConfig = fb.hosting.find(c => c.target === app.app);
        if (!hostConfig) {
          fb.hosting.push({
            target: app.app,
            public: `dist/apps/${app.app}`,
            ignore: [
              "firebase.json",
              "**/.*",
              "**/node_modules/**"
            ],
            rewrites: [
              {
                "source": "**",
                "destination": "/index.html"
              }
            ]
          });
        }
        const fp = resolve(`./firebase.json`);
        writeJson({ fp, data: fb });
      })(); 

  }); 
}