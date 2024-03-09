export function kelimeBaşıMı(sonHarf: string) {
  if (
    sonHarf === " " ||
    sonHarf === "" ||
    sonHarf === "(" ||
    sonHarf === "\n" ||
    sonHarf === "\r" ||
    sonHarf === "\r\n"
  ) {
    return true;
  }
  return false;
}
