import { TransformFactory } from '../..';
import { assignAttrsAtTag } from '..';

export let setDefaultColorAtPathTag: (
  defaultColor: string
) => TransformFactory = (defaultColor) =>
  assignAttrsAtTag('path', ({ previousAttrs }) => ({
    fill: previousAttrs.fill || defaultColor
  }));
