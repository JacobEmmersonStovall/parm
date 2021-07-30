#!/usr/bin/env ts-node-script
import { preBundle } from './pre-bundle';
import { deploy } from './deploy';
import { postBundle } from './post-bundle';
import { bundle } from './bundle';
import { preDeploy } from './pre-deploy';
import { fetch } from './apps';

type ValidStep = 
  'pre-bundle'| 'bundle'| 'post-bundle'| 'pre-deploy'| 'deploy'
;
type ValidSteps = Array<ValidStep>;

const help = 
`
Provide comma delimited app names
to deploy specific applications.
`
const argPositionsByName = {
  2: 'appNames',
  3: 'steps',
}
const [ 
  appNames,
  steps,
] = Object.keys(argPositionsByName)
  .map(key => process.argv[key]);

const main = async () => {
  const appNamesArr = (appNames + '').split(',');
  const allApps = (await fetch.apps()).map(conf => conf.app);
  const apps = 
    allApps.filter(app => appNamesArr.some(m => m === app));
  if (apps.length === 0) {
    console.log(`not a valid application '${appNames}'`);
    return;
  }
  const stepsArr = (steps + '').split(',') as ValidSteps;
  const allSteps: ValidStep[] = [
    'pre-bundle', 'bundle', 'post-bundle', 'pre-deploy', 'deploy'
  ];
  let runSteps = 
    allSteps.filter(app => stepsArr.some(m => m === app));
  if (runSteps.length === 0) {
    runSteps = allSteps;
  }
  
  if (runSteps.some(s => s === 'pre-bundle'))
    await preBundle(apps);
  if (runSteps.some(s => s === 'bundle'))
    await bundle(apps);
  if (runSteps.some(s => s === 'post-bundle'))
    await postBundle(apps);
  if (runSteps.some(s => s === 'pre-deploy'))
    await preDeploy(apps);
  if (runSteps.some(s => s === 'deploy'))
    await deploy(apps);
};

main();