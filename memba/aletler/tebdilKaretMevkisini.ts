export function tebdilKaretMevkisini(
  metinSahası: HTMLInputElement,
  mevki: number
) {
  metinSahası.focus();
  metinSahası.setSelectionRange(mevki, mevki);
}

export function tebdilKaretMevkisiniMenzille(
  metinSahası: HTMLInputElement,
  başMevki: number,
  sonMevki: number
) {
  metinSahası.focus();
  metinSahası.setSelectionRange(başMevki, sonMevki);
}
