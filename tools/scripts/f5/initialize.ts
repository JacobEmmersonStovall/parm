#!/usr/bin/env ts-node-script
import * as firestoreService from 'firestore-export-import';
import { IImportOptions } from 'firestore-export-import/dist/helper';
import { fetch } from './apps';
import { resolve } from './util';
import * as fs from 'fs';
import * as nunjucks from 'nunjucks';

// run this script by entering this into the terminal: 
// ./tools/f5/backup.ts
const main = async () => {
  const argPositionsByName = {
    2: 'appNames',
  }
  const [ 
    appNames,
  ] = Object.keys(argPositionsByName)
    .map(key => process.argv[key]);

  const appNamesArr = (appNames + '').split(',');
  const allApps = (await fetch.apps()).map(conf => conf.app);
  const apps = 
    allApps.filter(app => appNamesArr.some(m => m === app));
  if (apps.length === 0) {
    console.log(`not a valid application '${appNames}'`);
    return;
  }

  const serviceAccount = require('../../../env/parm-names-not-numbers.json');

  // Initiate Firebase App
  // param: `https://{project-id-from-service-account.json}.firebase.io.com``
  firestoreService.initializeApp(serviceAccount, 'https://parm-names-not-numbers.firebaseio.com');

  const options: IImportOptions = {
    autoParseDates: true,
  };

  appNamesArr.forEach(appName => {
    const f5 = resolve(`./apps/f5/`);
    const nodeLibrary = require(f5 + '/templates/initial-nodes.json');
    const nodeLibPath = resolve(f5 + `/artifacts/${appName}.library.json`);
    const file = nunjucks.render(f5 + '/templates/initial-nodes.json.njk', {
      app: appName,
      nodes: JSON.stringify(nodeLibrary['node-library'], null, 2),
    });
    fs.writeFileSync(nodeLibPath, file, 'utf8');

    // Start importing your data
    firestoreService.restore(nodeLibPath, options);
  });
}
main();