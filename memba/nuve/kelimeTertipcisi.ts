import { Nevi_KaretMevkisi } from "../nevler/karet";
import { harfLatinidenOsmaniye } from "./harfLatinidenOsmaniye";

export type OsmaniHarfEkleNeticesi = {
  kelimeOsmani: string;
  karetBaşMevkisi: number;
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

    return { kelimeOsmani: kelime, karetBaşMevkisi: kelime.length };
  }

  const { başMevki, sonMevki } = karetMevkisi;
  const karetEvveli = kelime.slice(0, başMevki);
  const karetAhiri = kelime.slice(sonMevki);

  if (hadise.key === "Backspace") {
    let silinecekHarfAdedi = 1;
    if (karetEvveli.endsWith("\u200C")) {
      silinecekHarfAdedi = 2;
    }
    const silinmedenSonra = karetEvveli.slice(
      0,
      karetEvveli.length - silinecekHarfAdedi
    );

    kelime = silinmedenSonra + karetAhiri;

    return {
      kelimeOsmani: kelime,
      karetBaşMevkisi: silinmedenSonra.length,
    };
  } else {
    const harf = harfLatinidenOsmaniye(
      hadise.key,
      karetEvveli.slice(-1),
      hadise.shiftKey,
      hadise.altKey
    );

    kelime = karetEvveli + harf + karetAhiri;

    let karetHareketMiktarı = harf.length;
    if (karetEvveli.endsWith("ا") && harf === "ا") {
      kelime = kelime.replace("اا", "آ");
      karetHareketMiktarı = harf.length - 1;
    }

    return {
      kelimeOsmani: kelime,
      karetBaşMevkisi: karetEvveli.length + karetHareketMiktarı,
    };
  }
}
