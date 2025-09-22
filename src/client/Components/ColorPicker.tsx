// Color picker to put beside canvas for brush color
import React from 'react';

import {
    generate, green, presetPalettes, red,
    ColorPicker, ColorPickerProps, theme,
} from '../antdComponents'

type Presets = Required<ColorPickerProps>['presets'][number];

function genPresets(presets = presetPalettes) {
  return Object.entries(presets).map<Presets>(([label, colors]) => ({ label, colors, key: label }));
}

// pass down changeColor prop from canvas
const CanvasColorPicker: React.FC = ({ changeColor }) => {
  const { token } = theme.useToken();
  const presets = genPresets({ primary: generate(token.colorPrimary), red, green });
  return (
    <ColorPicker 
      presets={presets} 
      defaultValue="#000000"
      onChange={(value) => {changeColor(value.toHexString())}}
    />
  );
};

export default CanvasColorPicker;
