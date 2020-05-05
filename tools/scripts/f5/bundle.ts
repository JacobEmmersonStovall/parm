import { run } from './util';
import { fetch } from './apps';

export const bundle = async () => {
  const apps = await fetch.apps();
  const promises = apps.map(app => new Promise(r => {
    run('nx', [
      'run',
      `f5:build:${app.app}`,
    ]).then(r);
  }));
  await Promise.all(promises);
}