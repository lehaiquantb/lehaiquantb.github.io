import { FC } from 'react';
import { Editor } from '../editor/Editor';
import { ConvertSvgReactNative } from '../svgr/convert-svg-rn';
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
