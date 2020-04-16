import { get } from '@ember/object';
import { dasherize } from '@ember/string';

export default function transformAttributes(data, transform) {
  let transformed = {}

  Object.keys(transform).forEach(key => {
    if (typeof transform[key] === 'function') {
      transformed[dasherize(key)] = transform[key](data)
    }
    else {
      transformed[dasherize(key)] = get(data, transform[key]);
    }
  })


  return transformed;
}
