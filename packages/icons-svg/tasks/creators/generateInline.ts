import { src, dest } from 'gulp';
import * as File from 'vinyl';
import { useRender } from '../../plugins';
import { RenderCustomData } from '../../plugins/render';
import { IconDefinition } from '../../templates/types';
import { HelperRenderOptions } from '../../templates/helpers';

export interface GenerateInlineOptions {
  from: string[];
  toDir: (file: File & { _renderData?: RenderCustomData }) => string;
  getIconDefinitionFromSource: (raw: string) => IconDefinition;
  renderOptions?: HelperRenderOptions;
}

export let ExtractRegExp = /({\s*".*});/;

export let generateInline = ({
  from,
  toDir,
  getIconDefinitionFromSource,
  renderOptions = {}
}: GenerateInlineOptions) =>
  function GenerateInline() {
    return src(from)
      .pipe(
        useRender({
          getIconDefinitionFromSource,
          renderOptions
        })
      )
      .pipe(dest(toDir));
  };
