import { createTransformStream } from '../creator';
import template from 'lodash.template';

export interface UseTemplatePluginOptions {
  template: string;
  mapToInterpolate: MapToInterpolate;
}

export interface MapToInterpolate {
  (meta: { name: string; content: string; path: string }): object;
}

export let useTemplate = ({
  template: tplContent,
  mapToInterpolate
}: UseTemplatePluginOptions) => {
  let executor = template(tplContent);
  return createTransformStream((content, { stem: name, path }) =>
    executor(mapToInterpolate({ name, content, path }))
  );
};
