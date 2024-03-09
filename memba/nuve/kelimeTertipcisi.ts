import { Nevi_KaretMevkisi } from "../nevler/karet";
import { harfLatinidenOsmaniye } from "./harfLatinidenOsmaniye";

export type OsmaniHarfEkleNeticesi = {
  kelimeOsmani: string;
  karetMevkisi: number;
};

export function ekleOsmaniKelimeyeHarf(
  mevcutKelime: string,
  karetMevkisi: Nevi_KaretMevkisi,
  hadise: KeyboardEvent
): OsmaniHarfEkleNeticesi {
  let kelime = mevcutKelime;

  if (kelime.length < 1) {
    kelime = harfLatinidenOsmaniye(
      hadise.key,
      "",
      hadise.shiftKey,
      hadise.altKey
    );

    return { kelimeOsmani: kelime, karetMevkisi: kelime.length };
  }

  const { başMevki, sonMevki } = karetMevkisi;
  const karetEvveli = kelime.slice(0, başMevki);
  const karetAhiri = kelime.slice(sonMevki);

  if (hadise.key === "Backspace") {
    let karetEvveliSilinmedenSonra = karetEvveli;
    if (karetEvveli.endsWith("\u200C")) {
      karetEvveliSilinmedenSonra = karetEvveli.slice(
        0,
        karetEvveliSilinmedenSonra.length - 2
      );
    } else {
      karetEvveliSilinmedenSonra = karetEvveli.slice(
        0,
        karetEvveliSilinmedenSonra.length - 1
      );
    }

    kelime = karetEvveliSilinmedenSonra + karetAhiri;

    return {
      kelimeOsmani: kelime,
      karetMevkisi: karetEvveliSilinmedenSonra.length - 1,
    };
  } else {
    const harf = harfLatinidenOsmaniye(
      hadise.key,
      karetEvveli.slice(-1),
      hadise.shiftKey,
      hadise.altKey
    );

    kelime = karetEvveli + harf + karetAhiri;
    return {
      kelimeOsmani: kelime,
      karetMevkisi: karetEvveli.length + harf.length - 1,
    };
  }
}
