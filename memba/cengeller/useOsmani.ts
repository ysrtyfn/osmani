import { RefObject, useEffect, useRef, useState } from "react";
import {
  Nevi_KaretMevkisi,
  alKaretİlkHalini,
  hazırlaKaretMevkisini,
} from "../nevler/karet";
import { ekleOsmaniKelimeyeHarf } from "../nuve/kelimeTertipcisi";

type OsmaniÇengelHususları = {
  aramaTalepEdilince?: () => void;
};

type OsmaniÇengelCevabı = [
  kelime: string,
  metinSahasıİması: RefObject<HTMLInputElement>
];

export const useOsmani = (
  hususlar?: OsmaniÇengelHususları
): OsmaniÇengelCevabı => {
  const [kelime, tebdilKelime] = useState("");
  const metinSahasıİması = useRef<HTMLInputElement>(null);
  const karetMevkisiİması = useRef<Nevi_KaretMevkisi>(alKaretİlkHalini());

  useEffect(() => {
    const metinSahası = metinSahasıİması.current as HTMLInputElement;

    const tuşaBasılınca = (hadise: KeyboardEvent) => {
      hadise.preventDefault();

      const karetMevkisiBaşı = metinSahası.selectionStart || 0;
      const karetMevkisiSonu = metinSahası.selectionEnd || 0;

      function tebdilKaretMevkisini(yeniMevki: number) {
        metinSahası.focus();
        metinSahası.setSelectionRange(yeniMevki, yeniMevki);
      }

      if (hadise.key === "Enter") {
        if (hususlar && hususlar.aramaTalepEdilince) {
          hususlar.aramaTalepEdilince();
        }
      } else if (hadise.key === "Delete") {
        karetMevkisiİması.current = hazırlaKaretMevkisini(0, 0);
        tebdilKelime("");
      } else if (hadise.key === "ArrowRight") {
        const karetEvveli = kelime.slice(0, karetMevkisiBaşı);
        let karetHareketMiktarı = 1;
        if (karetEvveli.endsWith("\u200C")) {
          karetHareketMiktarı = 2;
        }
        tebdilKaretMevkisini(karetMevkisiBaşı - karetHareketMiktarı);
      } else if (hadise.key === "ArrowLeft") {
        const karetAhiri = kelime.slice(karetMevkisiBaşı + 1);
        let karetHareketMiktarı = 1;
        if (karetAhiri.startsWith("\u200C")) {
          karetHareketMiktarı = 2;
        }
        tebdilKaretMevkisini(karetMevkisiBaşı + karetHareketMiktarı);
      } else if (hadise.key === "ArrowUp") {
        tebdilKaretMevkisini(0);
      } else if (hadise.key === "ArrowDown") {
        tebdilKaretMevkisini(kelime.length);
      } else {
        const { kelimeOsmani, karetMevkisi } = ekleOsmaniKelimeyeHarf(
          kelime,
          hazırlaKaretMevkisini(karetMevkisiBaşı, karetMevkisiSonu),
          hadise
        );

        karetMevkisiİması.current = hazırlaKaretMevkisini(
          karetMevkisi,
          karetMevkisi
        );

        tebdilKelime(kelimeOsmani);
      }
    };

    metinSahası.focus();
    metinSahası.addEventListener("keydown", tuşaBasılınca, false);

    const yeniKaretMevkisi = karetMevkisiİması.current.başMevki + 1;
    metinSahası.setSelectionRange(yeniKaretMevkisi, yeniKaretMevkisi);

    return () => {
      metinSahası.removeEventListener("keydown", tuşaBasılınca);
    };
  }, [hususlar, kelime]);

  return [kelime, metinSahasıİması];
};
