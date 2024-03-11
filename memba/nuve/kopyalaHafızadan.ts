export const kopyalaHafızadan = async () => {
  const hafızadakıMetin = await navigator.clipboard.readText();
  return hafızadakıMetin;
};
