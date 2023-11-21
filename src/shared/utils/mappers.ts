type AnyObject = {[key: string]: any};

export const transformYesNOValues = (obj: AnyObject): AnyObject => {
  const transformedObj: AnyObject = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];

      if (typeof value === 'object' && value !== null) {
        transformedObj[key] = transformYesNOValues(value);
      } else {
        transformedObj[key] =
          value === 'Yes' ? 'yes' : value === 'No' ? 'no' : value;
      }
    }
  }

  return transformedObj;
};
