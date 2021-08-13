import React from 'react';
import './react-file-upload.css';
import Dropzone, { IDropzoneProps, ILayoutProps, IPreviewProps, ISubmitButtonProps } from 'react-dropzone-uploader';
import { Grid, IconButton } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import RemoveIcon from '@material-ui/icons/Remove';

// https://react-dropzone-uploader.js.org/docs/examples

/* eslint-disable-next-line */
export type ReactFileUploadProps = {
  type: 'url',
  url: string,
} | ReactFileUploadOnSubmitProps;

export interface ReactFileUploadOnSubmitProps {
  type: 'onsubmit',
  onSubmit: IDropzoneProps['onSubmit'],
}



const Submit = (props: ISubmitButtonProps) => {
  const { 
    buttonClassName,
    buttonStyle, disabled, content,
    onSubmit, files
  } = props

  const uploading = 
    files.some(f => ['preparing', 'getting_upload_params', 'uploading'].includes(f.meta.status));
  const _disabled =
    uploading ||
    !files.some(f => ['headers_received', 'done'].includes(f.meta.status))

  const handleSubmit = () => {
    onSubmit(files.filter(f => ['headers_received', 'done'].includes(f.meta.status)))
  }

  return (
    <button 
      className={buttonClassName}
      style={{...buttonStyle, width: '100%'}}
      onClick={handleSubmit}
      disabled={disabled || _disabled}
    >
      {uploading ? 'uploading...' : content}
    </button>
  )
}

const Layout = (props: ILayoutProps) => {
  const {
    input,
    previews,
    submitButton,
    dropzoneProps,
    files,
    extra: { maxFiles },

  } = props

  return (
    <div {...dropzoneProps}>
      <Grid container>
        {previews}
      </Grid>

      <Grid container>
        <Grid item xs={6}>
          {files.length < maxFiles && input}
        </Grid>
        <Grid item xs={6}>
          {files.length > 0 && submitButton}
        </Grid>
      </Grid>
    </div>
  )
}


const Preview = (props: IPreviewProps) => {
  const { 
    meta: { name, percent, status, previewUrl },
    fileWithMeta: { 
      file: { title },
      cancel, remove,
    },
    canCancel,
    canRemove,
  } = props;
  return (
    <Grid item xs={4}>
      {previewUrl && (
        <img
          style={{
            height: 'auto',
            width: '100%',
          }}
          src={previewUrl}
          alt={title}
          title={title}
        />
      )}
      {!previewUrl && (
        <span className="dzu-previewFileName">{title}</span>
      )}
      <Grid container>
        <Grid item xs={8}>
        <div>
          title: {name}
        </div>
        <div>
          status: {status}
        </div>
        </Grid>
        <Grid item xs={4}>
          {status === 'uploading' && canCancel && (
            <IconButton
              onClick={cancel}
            >
              <CancelIcon/>  
            </IconButton>
          )}
          {status !== 'preparing' && status !== 'getting_upload_params' && status !== 'uploading' && canRemove && (
            <IconButton
              onClick={remove}
            >
              <RemoveIcon/>  
            </IconButton>
          )}
          </Grid>
      </Grid>
    </Grid>
  )
}

export const ReactFileUpload = (props: ReactFileUploadProps) => {
  let url;
  let onSubmit;
  let onChangeStatus;
  if (props.type === 'url') {
    url = props.url;
  }
  if (props.type === 'onsubmit') {
    onSubmit = props.onSubmit;
    // onSubmit = props.onChangeStatus;
  }
  const getUploadParams = () => {
    return { url }
  }

  const handleSubmit: IDropzoneProps['onSubmit'] = (files, allFiles) => {
    allFiles.forEach(f => f.remove())
  }

  return (
    <Dropzone
      getUploadParams={url ? getUploadParams : null}
      onChangeStatus={onChangeStatus}
      onSubmit={onSubmit || handleSubmit}
      SubmitButtonComponent={Submit}
      PreviewComponent={Preview}
      LayoutComponent={Layout}
      accept="image/*,audio/*,video/*"
      inputContent={(files, extra) => (
        extra.reject ? 'image, audio and video files only' : 'drag files or click to browse')
      }
      inputWithFilesContent="add more files"
      submitButtonContent="submit"
      styles={{ dropzone: { width: '100%', height: '100%' } }}
    />
  )
}

export default ReactFileUpload;
