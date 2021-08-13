import React, { useState, useCallback } from 'react';
import Grid from '@material-ui/core/Grid';
import { useImageUpload } from './firebase';
import Button from '@material-ui/core/Button';
import { getImageUrl } from './utils';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { ReactFileUpload, ReactFileUploadOnSubmitProps } 
  from '@parm/react/file-upload';
import { IFileWithMeta } from 'react-dropzone-uploader';
  
const initialPending: File[] = [];
const initialCompleted: string[] = [];

const imageStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  verticalAlign: 'baseline',
  marginTop: '5px',
}

const buttonStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  verticalAlign: 'baseline',
  marginTop: '5px',
}
 
export const ImgUploaderPlus = () => { 
  const [pending, setPending] = useState([...initialPending]);
  const [completed, setCompleted] = useState([...initialCompleted]);
  const { uploadImage } = useImageUpload();

  const onSubmit: ReactFileUploadOnSubmitProps['onSubmit'] =
    useCallback(async function (files: IFileWithMeta[], allFiles: IFileWithMeta[]) {
      await Promise.all(files.map(async fileMeta => {
        try {
          const result = await uploadImage(fileMeta.file);
          const url = getImageUrl({ filename: `${result.ref.name}` });
          setCompleted(prev => [
            url,
            ...prev,
          ]);
          console.log(url);
        } catch (e) {
          console.log(e)
        }
      }));
    }, []);

  return (
    <>
      <ReactFileUpload
        onSubmit={onSubmit}
        type='onsubmit'
      />
      <Grid 
        container
        alignItems='center'
        style={imageStyle}
      >
        {completed.map(url => {
          return (
            <>
              <Grid
                item xs={12}
                style={{ marginBottom: '5px' }}
              >
                <a href={url}>
                  <img
                    src={url}
                    style={{ height: '10em' }}
                  />
                </a>
              </Grid>
              <Grid
                item
                xs={12}
                container
                direction="row-reverse"
              >
                <Button
                  onClick={() => navigator.clipboard.writeText(url)}
                >
                  <div style={{ float: 'left', ...buttonStyle }} >
                    <span style={{
                      display: 'inline',
                      marginRight: '10px',
                      marginLeft: '10px',
                    }}>
                      click to copy
                    </span>
                    <span style={{display: 'inline', marginRight: '10px'}}>
                      <FileCopyIcon />
                    </span>
                  </div>
                </Button>
              </Grid>
            </>
          );
        })}
      </Grid>
    </>
  );
}