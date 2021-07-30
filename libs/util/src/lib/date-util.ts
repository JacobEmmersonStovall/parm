/** regex
 * matching yyyy-md-dd
 */
const yyyymmdd = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;

export const formatDate = (date: Date) => date.toISOString().split('T')[0];

export const diffDays = (a: string, b: string) => {
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const firstDate = new Date(a);
  const secondDate = new Date(b)
  return Math.round(Math.abs((+secondDate - +firstDate) / oneDay));
}

export const validateDate = value => {
  return yyyymmdd.test(value);
}