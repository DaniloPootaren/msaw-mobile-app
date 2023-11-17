const {format, parseISO} = require('date-fns');

export const convertDateString = (inputString: string) => {
  const dateObject = parseISO(inputString);
  const formattedString = format(dateObject, 'MMMM do, yyyy HH:mm');

  return formattedString;
};
