import Button from '@material-ui/core/Button';
import React from 'react';

import { useFields } from '@parm/react/use-field';
import Grid from '@material-ui/core/Grid';
import { StringParam, useQueryParams } from 'use-query-params';

/* eslint-disable-next-line */
export interface PhotoReleaseConsentFormProps {
}

const validate = (value: string) => value.trim() !== '';

export const PhotoReleaseConsentForm = (props: PhotoReleaseConsentFormProps) => {
  const [{ focus }, setQuery] = useQueryParams({
    focus: StringParam,
  });
  const submit = async () => {
    console.log({
      fullname, email, instagram, signature, date
    })
  };
  const [
    fullname,
    email,
    instagram,
    signature,
    date,
  ] = useFields([
    { label: 'Full Name', value: '', validate },
    { label: 'Email', value: '' , validate },
    { label: 'Instagram', value: '', validate },
    { label: 'Signature', value: '', validate },
    { label: 'Date', value: '', validate },
  ]);
  return (
    <div>

      <Grid container spacing={1}>
        <Grid item xs={9}>
          <h2>
            Image Photography Release
          </h2>
        </Grid>
        <Grid item xs={3}>
          <img 
            style={{
              width: '100%',
            }} 
            src="https://i.imgur.com/rUW2jAK.png"
            alt="SVP"
          ></img>
        </Grid>
      </Grid>

      This is a standard photo release form. Please enter the following information, 
      read the agreement below, and sign and date.

      <div>
        {fullname.field}
        {email.field}
        {instagram.field}
      </div>

      <br/>

      I <strong>{fullname.value || '______________'}</strong> hereby grant 
      to <strong>Silicon Visual Productions L.L.C.</strong> and any licensees, agents, 
      and assignees thereof (“Producer”) the perpetual, 
      irrevocable, global and unrestricted right to use, reproduce, publish and copyright 
      (collectively, "Use") my picture, likeness, and voice (collectively, "Image") 
      in any media for publicity, art, advertising, trade, or for any other lawful purpose 
      related to the listed project or projects:
      <br/>
      <br/>

      The compensation I receive for my work, and/or recordings, 
      will be considered my complete compensation for my appearance. 
      I understand there will be no residual rights or payments made with 
      respect to these recordings.
      <br/>
      <br/>

      I understand that my Image may be substantially edited, altered, or 
      modified. I hereby waive any right to inspect or approve Producer’s 
      Use of my Image in any media.
      <br/>
      <br/>

      I grant the Producer the right to market and sell copies of my Image. 
      I also waive any right to royalties or other compensation related to 
      Producer’s Use of my Image.
      <br/>
      <br/>

      I release Producer and any legal representatives and assigns thereof from 
      any claims in connection with the Use of my Image. 
      I intend for this agreement to bind all of my heirs, assignees, 
      personal representatives, and members of my family.
      <br/>
      <br/>

      I am at least 18 years old, have read and understand this agreement, 
      and am competent to execute it.
      <br/>
      <br/>

      Signing a copy of this agreement, physical or electronic, will 
      have the same effect as signing an original.
      <br/>
      <br/>

      <strong>Sign below:</strong>

      <Grid container spacing={1}>
        <Grid item xs={12} style={{ marginBottom: '5px'}}>
          {signature.field}
          {date.field}
        </Grid>
        <Grid item container direction="row-reverse">
          <Button
            onClick={submit}
          >
            Submit 
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default PhotoReleaseConsentForm;
