#!/usr/bin/env ts-node-script

import { 
  writeJson
} from './util';

// run this script by entering this into the terminal: 
// ./tools/f5/backup.ts
const firestoreService = require('firestore-export-import');

// param: `https://{project-id-from-service-account.json}.firebase.io.com``
const databaseUrl = 'https://parm-names-not-numbers.firebaseio.com';

const serviceAccount = require('../../../env/parm-names-not-numbers.json');
 
// Initiate Firebase App
firestoreService.initializeApp(serviceAccount, databaseUrl);
 
// Start exporting your data
firestoreService
  .backups()
  .then((data) => {
    writeJson({ fp: 'tmp/firestore-backup.json', data });
  });