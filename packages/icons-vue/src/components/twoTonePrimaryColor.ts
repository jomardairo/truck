import VueIcon from './IconBase';
import { normalizeTwoToneColors } from '../utils';

export type TwoToneColor = string | [string, string];
export function setTwoToneColor(twoToneColor: TwoToneColor): void {
  let [primaryColor, secondaryColor] = normalizeTwoToneColors(twoToneColor);
  return VueIcon.setTwoToneColors({
    primaryColor,
    secondaryColor,
  });
}

export function getTwoToneColor(): TwoToneColor {
  let colors = VueIcon.getTwoToneColors();
  if (!colors.calculated) {
    return colors.primaryColor;
  }
  return [colors.primaryColor, colors.secondaryColor];
}
