export function tebdilKaretMevkisini(
  metinSahası: HTMLInputElement,
  mevki: number,
  celbiNazar: boolean = false
) {
  if (celbiNazar) {
    metinSahası.focus();
  }
  metinSahası.setSelectionRange(mevki, mevki);
}

export function tebdilKaretMevkisiniMenzille(
  metinSahası: HTMLInputElement,
  başMevki: number,
  sonMevki: number,
  celbiNazar: boolean = false
) {
  if (celbiNazar) {
    metinSahası.focus();
  }
  metinSahası.setSelectionRange(başMevki, sonMevki);
}
