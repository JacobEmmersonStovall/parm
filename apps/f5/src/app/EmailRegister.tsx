import { Button } from '@material-ui/core';
import React, { useCallback, useState } from 'react';
import uuidv1 from 'uuid/v1';

var firebase = require('firebase');
import * as firebaseui from 'firebaseui';

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

export const EmailRegister = () => {

  const [id] = useState(
    'firebaseui-auth-container-' + uuidv1()
  );
  
  const onRegister = useCallback(() => {
    ui.start(`#${id}`, {
      // callbacks: {
      //   signInSuccessWithAuthResult: () => false,
      // },
      signInSuccessUrl: '/',
      signInOptions: [
        {
          provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
          requireDisplayName: false
        }
      ]
    });
  }, []);

  return (
    <div>
      <div id={id}/>
      <Button
        onClick={onRegister}
      >
        Register
      </Button>
    </div>
  );
}