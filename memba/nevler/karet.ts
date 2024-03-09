export type Nevi_KaretMevkisi = {
  başMevki: number;
  sonMevki: number;
};

export function alKaretİlkHalini(): Nevi_KaretMevkisi {
  return { başMevki: 0, sonMevki: 0 };
}

export function hazırlaKaretMevkisini(mevki: number): Nevi_KaretMevkisi {
  return { başMevki: mevki, sonMevki: mevki };
}

export function hazırlaKaretMevkisiniMenzilli(
  baş: number,
  son: number
): Nevi_KaretMevkisi {
  return { başMevki: baş, sonMevki: son };
}
