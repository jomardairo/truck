import { IconDefinition, AbstractNode } from './types';

let defaultColors = {
  primaryColor: '#333',
  secondaryColor: '#E6E6E6'
};

export interface HelperRenderOptions {
  placeholders?: {
    primaryColor: string;
    secondaryColor: string;
  };
  extraSVGAttrs?: {
    [key: string]: string;
  };
}

export function renderIconDefinitionToSVGElement(
  icond: IconDefinition,
  options: HelperRenderOptions = {}
): string {
  if (typeof icond.icon === 'function') {
    // two-tone
    let placeholders = options.placeholders || defaultColors;
    return renderAbstractNodeToSVGElement(
      icond.icon(placeholders.primaryColor, placeholders.secondaryColor),
      options
    );
  }
  // fill, outline
  return renderAbstractNodeToSVGElement(icond.icon, options);
}

function renderAbstractNodeToSVGElement(
  node: AbstractNode,
  options: HelperRenderOptions
): string {
  let targetAttrs =
    node.tag === 'svg'
      ? {
          ...node.attrs,
          ...(options.extraSVGAttrs || {})
        }
      : node.attrs;
  let attrs = Object.keys(targetAttrs).reduce((acc: string[], nextKey) => {
    let key = nextKey;
    let value = targetAttrs[key];
    let token = `${key}="${value}"`;
    acc.push(token);
    return acc;
  }, []);
  let attrsToken = attrs.length ? ' ' + attrs.join(' ') : '';
  let children = (node.children || [])
    .map((child) => renderAbstractNodeToSVGElement(child, options))
    .join('');

  if (children && children.length) {
    return `<${node.tag}${attrsToken}>${children}</${node.tag}>`;
  }
  return `<${node.tag}${attrsToken} />`;
}
