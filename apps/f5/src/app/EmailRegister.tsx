import React, { useCallback, useEffect, useState } from 'react';
import uuidv1 from 'uuid/v1';
import 'firebaseui/dist/firebaseui.css'
import { get } from '@prmichaelsen/ts-utils';

import * as firebase from 'firebase';
import * as firebaseui from 'firebaseui';

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

export const EmailRegister = () => {

  const [id] = useState(
    'firebaseui-auth-container-' + uuidv1()
  );

  const user =
    get(firebase.auth().currentUser, u => u.email);

  useEffect(() => {
    if (user)
      return;
    ui.start(`#${id}`, {
      callbacks: {
        signInSuccessWithAuthResult: () => false,
      },
      signInOptions: [
        {
          provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
          requireDisplayName: false
        }
      ]
    });
  }, [user]);

  if (user) {
    return `Signed in as ${user}`;
  }

  return (
    <div id={id}/>
  );
}