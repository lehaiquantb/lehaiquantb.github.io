import React, { FC } from 'react';
import { ConvertSvgReactNative } from '../svgr/convert-svg-rn';
import { Editor } from '../editor/Editor';
import { ConvertImageBase64 } from './ConvertImageBase64';

export const CommonTool: FC = () => {
  return (
    <div>
      <ConvertSvgReactNative />
      <Editor />
      <ConvertImageBase64 />
    </div>
  );
};
