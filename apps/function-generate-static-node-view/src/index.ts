import * as nunjucks from 'nunjucks';
import * as fs from 'fs';
import { firebase } from './firebase';
import * as admin from 'firebase-admin';

export type OptionType =
| 'prompt'
| 'action'
| 'redirect'
| 'image'
;

export interface Option {
  parent: string;
  children: string[];
  text: string;
  id: string;
  type: OptionType;
  creatorId: string;
  createTime: admin.firestore.Timestamp;
  isRoot?: boolean;
  data?: {[key: string]: any }
}

firebase();

/**
 *
 * feature: generatic static node view gcpf
 * - add generate static node view google cloud platform function
 * - pubsub function that generates a static html view for this
 *   now and and stores it in cloud storage
 */
export const functionGenerateStaticNodeView = async (event: Option, context?: any) => {
  const { text, id } = event;
  /** template path */
  const fp = `parm/nodes/${id}.html`;
  const tp = './index.njk';
  const f = fs.readFileSync(tp);
  const template = f.toString();
  const html = nunjucks.renderString(template, {
    text
  });
  const bucket = admin.storage().bucket('parm-names-not-numbers.appspot.com');
  const ref = bucket.file(fp);
  await ref.save(html, {
    metadata: {
      contentType: 'text/html',
    },
  });

  return html;
};
