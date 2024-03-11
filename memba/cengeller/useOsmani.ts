import { RefObject, useEffect, useRef, useState } from "react";
import { tebdilKaretMevkisiniMenzille } from "../aletler/tebdilKaretMevkisini";
import {
  Nevi_KaretMevkisi,
  hazırlaKaretMevkisini,
  hazırlaKaretMevkisiniMenzilli,
} from "../nevler/karet";
import { ekleOsmaniKelimeyeHarf } from "../nuve/kelimeTertipcisi";
import { kopyalaHafızaya } from "../nuve/kopyalaHafizaya";
import { kopyalaHafızadan } from "../nuve/kopyalaHafızadan";

type OsmaniÇengelHususları = {
  ibtidaiKelime: string;
  tekSatırMı: boolean;
  aramaTalepEdilince?: () => void;
};

type OsmaniÇengelCevabı<T> = [kelime: string, metinSahasıİması: RefObject<T>];

export const useOsmani = <T>(
  hususlar?: OsmaniÇengelHususları
): OsmaniÇengelCevabı<T> => {
  const ibtidaiKelime = hususlar ? hususlar.ibtidaiKelime : "";

  const [kelime, tebdilKelime] = useState(ibtidaiKelime);
  const metinSahasıİması = useRef<T>(null);
  const karetMevkisiİması = useRef<Nevi_KaretMevkisi>(
    hazırlaKaretMevkisini(ibtidaiKelime.length)
  );

  useEffect(() => {
    let metinSahası = metinSahasıİması.current as HTMLInputElement;

    // tebdilKaretMevkisini(metinSahası, karetMevkisiİması.current.başMevki);
    tebdilKaretMevkisiniMenzille(
      metinSahası,
      karetMevkisiİması.current.başMevki,
      karetMevkisiİması.current.sonMevki
    );

    const tuşaBasılınca = async (hadise: KeyboardEvent) => {
      hadise.preventDefault();
      hadise.stopPropagation();

      const karetMevkisiBaşı = metinSahası.selectionStart || 0;
      const karetMevkisiSonu = metinSahası.selectionEnd || 0;

      if (hususlar && hususlar.tekSatırMı && hadise.key === "Enter") {
        if (hususlar.aramaTalepEdilince) {
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
      } else if (hadise.ctrlKey) {
        karetMevkisiİması.current = hazırlaKaretMevkisiniMenzilli(
          karetMevkisiBaşı,
          karetMevkisiSonu
        );

        if (hadise.key.toLowerCase() === "c") {
          const kopyalanacakMetin = kelime.slice(
            karetMevkisiBaşı,
            karetMevkisiSonu
          );
          kopyalaHafızaya(kopyalanacakMetin, (netice) => {});
        } else if (hadise.key.toLowerCase() === "x") {
          const kesilecekMetin = kelime.slice(
            karetMevkisiBaşı,
            karetMevkisiSonu
          );
          kopyalaHafızaya(kesilecekMetin, (netice) => {});

          const kesilmedenSonraKelime =
            kelime.slice(0, karetMevkisiBaşı) + kelime.slice(karetMevkisiSonu);

          karetMevkisiİması.current = hazırlaKaretMevkisini(karetMevkisiBaşı);
          tebdilKelime(kesilmedenSonraKelime);
        } else if (hadise.key.toLowerCase() === "v") {
          const hafızadakiMetin = await kopyalaHafızadan();

          if (hafızadakiMetin.length > 0) {
            const ilavedenSonraKelime =
              kelime.slice(0, karetMevkisiBaşı) +
              hafızadakiMetin +
              kelime.slice(karetMevkisiSonu);

            karetMevkisiİması.current = hazırlaKaretMevkisini(
              karetMevkisiBaşı + hafızadakiMetin.length
            );
            tebdilKelime(ilavedenSonraKelime);
          }
        }
      } else {
        const { kelimeOsmani, karetBaşMevkisi } = ekleOsmaniKelimeyeHarf(
          kelime,
          hazırlaKaretMevkisiniMenzilli(karetMevkisiBaşı, karetMevkisiSonu),
          hadise
        );

        karetMevkisiİması.current = hazırlaKaretMevkisini(karetBaşMevkisi);
        tebdilKelime(kelimeOsmani);
      }

      tebdilKaretMevkisiniMenzille(
        metinSahası,
        karetMevkisiİması.current.başMevki,
        karetMevkisiİması.current.sonMevki
      );
    };

    // metinSahası.focus();
    metinSahası.addEventListener("keydown", tuşaBasılınca, false);

    return () => {
      metinSahası.removeEventListener("keydown", tuşaBasılınca);
    };
  }, [kelime]);

  return [kelime, metinSahasıİması];
};
