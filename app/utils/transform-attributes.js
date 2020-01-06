import { get } from '@ember/object';
import { underscore } from '@ember/string';

export default function transformAttributes(data, transform) {
  let transformed = {}

  Object.keys(transform).forEach(key => {
    if (typeof transform[key] === 'function') {
      transformed[underscore(key)] = transform[key](data)
    }
    else {
      transformed[underscore(key)] = get(data, transform[key]);
    }
  })

  return transformed;
}
