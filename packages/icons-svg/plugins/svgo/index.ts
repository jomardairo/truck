import SVGO from 'svgo';
import { createTransformStreamAsync } from '../creator';

export let svgo = (options: SVGO.Options) => {
  let optimizer = new SVGO(options);
  return createTransformStreamAsync(async (before) => {
    let { data } = await optimizer.optimize(before);
    return data;
  });
};
