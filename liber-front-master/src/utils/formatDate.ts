export function FormatterDateToday() {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = (today.getMonth() + 1).toString(); // Months start at 0!
  let dd = today.getDate().toString();
  if (Number(dd) < 10) dd = `0${dd}`;
  if (Number(mm) < 10) mm = `0${mm}`;
  const formattedToday = `${dd}/${mm}/${yyyy}`;

  return formattedToday;
}

export function FormatterDateExpired(day: number) {
  const someDate = new Date();
  const numberOfDaysToAdd = day;
  const result = someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
  const expiredDate = new Date(result);
  const yyyy = expiredDate.getFullYear();
  let mm = (expiredDate.getMonth() + 1).toString(); // Months start at 0!
  let dd = expiredDate.getDate().toString();
  if (Number(dd) < 10) dd = `0${dd}`;
  if (Number(mm) < 10) mm = `0${mm}`;
  const formattedExpired = `${dd}/${mm}/${yyyy}`;

  return formattedExpired;
}
