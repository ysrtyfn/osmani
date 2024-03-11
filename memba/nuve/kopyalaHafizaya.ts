export const kopyalaHafızaya = (
  kelime: string,
  neticelenince?: (netice: string) => void
) => {
  navigator.clipboard.writeText(kelime).then(
    () => {
      if (neticelenince) neticelenince("Kopyalandı.");
    },
    () => {
      if (neticelenince) neticelenince("Kopyalanamadı!");
    }
  );
};
