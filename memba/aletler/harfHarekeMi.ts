export function harfHarekeMi(harf: string) {
  if (işaretler.includes(harf)) {
    return true;
  }
  return false;
}

const işaretler = [
  "\u0650", // Kesra
  "\u0670", // Elif Üst
  "\u0654", // Hemze Üst
  "\u0651", // Şedde
  "\u0655", // Hemze Alt
  "\u064E", // Fetha
  "\u0652", // Sukun
  "\u064D", // Kesra Tenvin
  "\u0653", // Med
  "\u0656", // Elif Üst
  "\u064F", // Damme
  "\u064B", // Fetha Tenvin
  "\u064C", // Damme Tenvin
];
