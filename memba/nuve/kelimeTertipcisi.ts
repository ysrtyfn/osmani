import { harfHarekeMi } from "../aletler/harfHarekeMi";
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
  const niyetHarekeMi = hadise.getModifierState("CapsLock");

  if (kelime.length < 1) {
    kelime = harfLatinidenOsmaniye(
      hadise.key,
      "",
      hadise.shiftKey,
      hadise.altKey,
      false
    ).replace("\u200C", "");

    return { kelimeOsmani: kelime, karetBaşMevkisi: kelime.length };
  }

  const { başMevki, sonMevki } = karetMevkisi;
  const karetEvveli = kelime.slice(0, başMevki);
  const karetAhiri = kelime.slice(sonMevki);
  const karetEvvelindekiHarf = karetEvveli.slice(-1);

  if (hadise.key === "Backspace") {
    let silinecekHarfAdedi = 1;
    if (karetEvveli.endsWith("\u200C") || harfHarekeMi(karetEvvelindekiHarf)) {
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
      karetEvvelindekiHarf,
      hadise.shiftKey,
      hadise.altKey,
      niyetHarekeMi
    );

    kelime = karetEvveli + harf + karetAhiri;

    if (
      niyetHarekeMi &&
      harfHarekeMi(karetEvvelindekiHarf) &&
      harfHarekeMi(harf)
    ) {
      kelime = karetEvveli.slice(0, karetEvveli.length - 1) + harf + karetAhiri;
    }

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
