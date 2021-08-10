#!/usr/bin/env ts-node-script
import * as firestoreService from 'firestore-export-import';
import { IImportOptions } from 'firestore-export-import/dist/helper';

// run this script by entering this into the terminal: 
// ./tools/f5/backup.ts
{

  const serviceAccount = require('../../../env/parm-names-not-numbers.json');

  // Initiate Firebase App
  // param: `https://{project-id-from-service-account.json}.firebase.io.com``
  firestoreService.initializeApp(serviceAccount, 'https://parm-names-not-numbers.firebaseio.com');

  const options: IImportOptions = {
    autoParseDates: true,
  };

  // Start importing your data
  firestoreService.restore('apps/f5//artifacts/node-library.json', options);
}