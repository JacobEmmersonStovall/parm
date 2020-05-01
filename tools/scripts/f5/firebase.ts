import * as admin from 'firebase-admin';
import * as path from 'path';

const state = { isInitialized: false };
export const firebase = () => {
  if (state.isInitialized)
    return admin;
  const config = {
    firebaseSecretsPath: './env/parm-app.json',
    firebaseDatabaseUrl: 'https://parm-app.firebaseio.com',
  }; 
  let finalConfigLocation = config.firebaseSecretsPath;
  if (!path.isAbsolute(config.firebaseSecretsPath)) {
    finalConfigLocation = path.resolve(process.cwd(), config.firebaseSecretsPath);
  }
  admin.initializeApp({
    credential: admin.credential.cert(finalConfigLocation),
    databaseURL: config.firebaseDatabaseUrl,
  });
  state.isInitialized = true;
  return admin; 
}