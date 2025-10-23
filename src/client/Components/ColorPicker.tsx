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

const mainColors = [
  {
    colors: [
      "#FF0000",
      "#FF7F00",
      "#FFFF00",
      "#00FF00",
      "#0000FF",
      "#4B0082",
      "#EE82EE",
      "#000000"
    ],
    key: 'palette',
    label: 'main colors'
  }
]

// pass down changeColor prop from canvas
const CanvasColorPicker: React.FC = ({ changeColor }) => {
  const { token } = theme.useToken();
  const presets = genPresets({ primary: generate(token.colorPrimary)});
  // console.log(presets)
  return (
    <ColorPicker 
      presets={mainColors} 
      defaultValue="#000000"
      onChange={(value) => {changeColor(value.toHexString())}}
    />
  );
};

export default CanvasColorPicker;
