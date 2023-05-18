export const formatDate = (date: NativeDate) => {
  const localDate = new Date(date);

  const YYYY = localDate.getFullYear();
  const MM = (localDate.getMonth() + 1).toString().padStart(2, '0');
  const DD = (localDate.getDate()).toString().padStart(2, '0');
  const HH = (localDate.getHours()).toString().padStart(2, '0');
  const mm = (localDate.getMinutes()).toString().padStart(2, '0');

  return `${YYYY}-${MM}-${DD} ${HH}:${mm}`;
};
