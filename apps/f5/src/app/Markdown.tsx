
import MarkdownToJsx from 'markdown-to-jsx'; 
import React from 'react';
import { Typography } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import AceEditor from 'react-ace';
 
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-typescript';
import 'ace-builds/src-noconflict/theme-xcode';
import 'ace-builds/src-noconflict/theme-twilight';
import { useThemePrefs } from './hooks';
import { useStyles } from './useStyles';
import { YoutubeLinkConverter } from './YoutubeLinkConverter';
import { ImgUploader } from './ImageUploader';
import { ImgViewer } from './ImageViewer';
import { Admin } from './Admin';

export const Markdown = ({ children }) => {
  const { isDark } = useThemePrefs();
  const aceTheme = isDark ? 'twilight' : 'xcode';
  const classes = useStyles();
  return (
    <MarkdownToJsx options={{
      forceBlock: false,
      overrides: {
        blockquote: ({ children, ...props }) => (
          <Typography
            {...props}
            variant="body2"
            color="textSecondary"
            className={classes.quote}
            component="div"
          >
            {children}
          </Typography>
        ),
        code: ({ children, className: lang, ...props }) => {
          if (!lang) {
            return (
              <code key={props.key}>{children}</code>
            )
          }
          return (
            <AceEditor
              maxLines={Infinity}
              mode={lang ? lang.split('-')[1] : ''}
              theme={aceTheme}
              value={children}
              readOnly
            />
          );
        },
        YoutubeLinkConverter,
        ImgUploader,
        Admin,
        ImgViewer,
        ListItem,
      },
    }}>
      {children}
    </MarkdownToJsx>
  );
}