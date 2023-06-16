export const getCount = () => {
  const stored = localStorage.getItem('hoi:count');
  if (!stored) return 0;
  return Number(stored);
}

export const incrementCount = () => {
  const stored = localStorage.getItem("hoi:count");
  const count = stored ? Number(stored) : 0;
  localStorage.setItem('hoi:count', String(count + 1));
  return count + 1;
}
