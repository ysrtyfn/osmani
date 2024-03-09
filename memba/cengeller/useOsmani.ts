import { RefObject, useEffect, useRef, useState } from "react";
import {
  Nevi_KaretMevkisi,
  alKaretİlkHalini,
  hazırlaKaretMevkisini,
  hazırlaKaretMevkisiniMenzilli,
} from "../nevler/karet";
import { ekleOsmaniKelimeyeHarf } from "../nuve/kelimeTertipcisi";
import { tebdilKaretMevkisini } from "../aletler/tebdilKaretMevkisini";

type OsmaniÇengelHususları = {
  ibtidaiKelime: string;
  aramaTalepEdilince?: () => void;
};

type OsmaniÇengelCevabı = [
  kelime: string,
  metinSahasıİması: RefObject<HTMLInputElement>
];

// TODO: tecrübe edilmeli

export const useOsmani = (
  hususlar?: OsmaniÇengelHususları
): OsmaniÇengelCevabı => {
  const ibtidaiKelime = hususlar ? hususlar.ibtidaiKelime : "";

  const [kelime, tebdilKelime] = useState(ibtidaiKelime);
  const metinSahasıİması = useRef<HTMLInputElement>(null);
  const karetMevkisiİması = useRef<Nevi_KaretMevkisi>(
    hazırlaKaretMevkisini(ibtidaiKelime.length)
  );

  useEffect(() => {
    const metinSahası = metinSahasıİması.current as HTMLInputElement;
    tebdilKaretMevkisini(metinSahası, karetMevkisiİması.current.başMevki);

    const tuşaBasılınca = (hadise: KeyboardEvent) => {
      hadise.preventDefault();

      const karetMevkisiBaşı = metinSahası.selectionStart || 0;
      const karetMevkisiSonu = metinSahası.selectionEnd || 0;

      if (hadise.key === "Enter") {
        if (hususlar && hususlar.aramaTalepEdilince) {
          hususlar.aramaTalepEdilince();
        }
      } else if (hadise.key === "Delete") {
        karetMevkisiİması.current = hazırlaKaretMevkisini(0);
        tebdilKelime("");
      } else if (hadise.key === "ArrowRight") {
        const karetEvveli = kelime.slice(0, karetMevkisiBaşı);
        let karetHareketMiktarı = 1;
        if (karetEvveli.endsWith("\u200C")) {
          karetHareketMiktarı = 2;
        }
        karetMevkisiİması.current = hazırlaKaretMevkisini(
          karetMevkisiBaşı - karetHareketMiktarı
        );
      } else if (hadise.key === "ArrowLeft") {
        const karetAhiri = kelime.slice(karetMevkisiBaşı + 1);
        let karetHareketMiktarı = 1;
        if (karetAhiri.startsWith("\u200C")) {
          karetHareketMiktarı = 2;
        }
        karetMevkisiİması.current = hazırlaKaretMevkisini(
          karetMevkisiBaşı + karetHareketMiktarı
        );
      } else if (hadise.key === "ArrowUp") {
        karetMevkisiİması.current = hazırlaKaretMevkisini(0);
      } else if (hadise.key === "ArrowDown") {
        karetMevkisiİması.current = hazırlaKaretMevkisini(kelime.length);
      } else {
        const { kelimeOsmani, karetBaşMevkisi } = ekleOsmaniKelimeyeHarf(
          kelime,
          hazırlaKaretMevkisiniMenzilli(karetMevkisiBaşı, karetMevkisiSonu),
          hadise
        );

        karetMevkisiİması.current = hazırlaKaretMevkisini(karetBaşMevkisi);
        tebdilKelime(kelimeOsmani);
      }

      tebdilKaretMevkisini(metinSahası, karetMevkisiİması.current.başMevki);
    };

    metinSahası.focus();
    metinSahası.addEventListener("keydown", tuşaBasılınca, false);

    return () => {
      metinSahası.removeEventListener("keydown", tuşaBasılınca);
    };
  }, [hususlar, kelime]);

  return [kelime, metinSahasıİması];
};
