#!/usr/bin/env ts-node-script

import { 
  writeJson
} from './util';
import * as firestoreService from 'firestore-export-import';
import { fetch } from './apps';

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
  if (appNamesArr.length === 0) {
  }
  const allApps = (await fetch.apps()).map(conf => conf.app);
  const apps =
    allApps.filter(app => appNamesArr.some(m => m === app));
  if (apps.length === 0 && appNamesArr.length !== 0) {
    console.log(`not a valid application '${appNames}'`);
    return;
  }
  const backupApps = apps.length ? apps : allApps;

  // param: `https://{project-id-from-service-account.json}.firebase.io.com``
  const databaseUrl = 'https://parm-names-not-numbers.firebaseio.com';

  const serviceAccount = require('../../../env/parm-names-not-numbers.json');

  // Initiate Firebase App
  firestoreService.initializeApp(serviceAccount, databaseUrl);

  // Start exporting your data
  firestoreService
    .backups(backupApps)
    .then((data) => {
      writeJson({ fp: 'tmp/firestore-backup.json', data });
    });
}

main();