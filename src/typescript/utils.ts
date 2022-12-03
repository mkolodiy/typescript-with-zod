import { cloneDeep } from 'lodash';
import { isValid, parseISO } from 'date-fns';

export function castObj(obj: any) {
  const objCopy = cloneDeep(obj);
  for (const [key, value] of Object.entries(objCopy)) {
    if (value === null) {
      continue;
    }

    if (typeof value === 'string') {
      const isDate = isValid(parseISO(value));
      if (isDate) {
        const dateCast = parseISO(value);
        objCopy[key] = dateCast;
      }
    }

    if (typeof value === 'object') {
      objCopy[key] = castObj(value);
    }
  }

  return objCopy;
}

export function castArr(arr: any[]) {
  return arr.map((entry) => castObj(entry));
}
