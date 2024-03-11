import { kelimeBaşıMı } from "../aletler/kelimeBasiMi";

export function harfLatinidenOsmaniye(
  latiniHarf: string,
  öncekiHarf: string,
  shiftBasılıMı: boolean,
  altBasılıMı: boolean,
  capsLockBasılıMı: boolean
) {
  switch (latiniHarf) {
    case "Enter":
      return "\n";
    case "Control":
      return "";
    case "Shift":
      return "";
    case "CapsLock":
      return "";
    case "Alt":
      return "";
    case "AltGraph":
      return "";
    case "NumLock":
      return "";
    case "Backspace":
      return "";
    case "Tab":
      return "";

    case " ":
      return " ";

    case ".":
      return ".";
    case ",":
      return "،";
    case ";":
      return "؛";
    case ":":
      return ":";
    case "?":
      return "؟";

    case "a":
    case "A":
      if (capsLockBasılıMı) {
        return "\u0650"; // Kesra
      } else if (shiftBasılıMı) {
        return "ع";
      } else if (altBasılıMı) {
        // return "أ";
        return "\u0623";
      }
      return "ا";

    case "b":
    case "B":
      return "ب";

    case "c":
    case "C":
      if (capsLockBasılıMı) {
        return "\u0670"; // Elif Üst
      }
      return "ج";

    case "ç":
    case "Ç":
      return "چ";

    case "d":
    case "D":
      if (capsLockBasılıMı) {
        return "\u0654"; // Hemze Üst
      } else if (shiftBasılıMı) {
        return "ض";
      }
      return "د";

    case "e":
    case "E":
      if (capsLockBasılıMı) {
        return "\u0651"; // Şedde
      }
      return "ه" + "\u200C";

    case "f":
    case "F":
      if (capsLockBasılıMı) {
        return "\u0655"; // Hemze Alt
      }
      return "ف";

    case "g":
    case "G":
      return "گ";

    case "ğ":
    case "Ğ":
      if (shiftBasılıMı) {
        return "ػ";
      }
      return "غ";

    case "h":
    case "H":
      if (shiftBasılıMı) {
        return "خ";
      } else if (altBasılıMı) {
        return "ه";
      }
      return "ح";

    case "ı":
    case "I":
      if (kelimeBaşıMı(öncekiHarf)) {
        return "اي";
      }
      return "ي";
    // return "ى"

    case "i":
    case "İ":
      if (kelimeBaşıMı(öncekiHarf)) {
        return "اي";
      }
      return "ي";
    // return "ى"

    case "j":
    case "J":
      return "ژ";

    case "k":
    case "K":
      return "ك";

    case "q":
    case "Q":
      if (capsLockBasılıMı) {
        return "\u064E"; // Fetha
      }
      return "ق";

    case "l":
    case "L":
      return "ل";

    case "m":
    case "M":
      return "م";

    case "n":
    case "N":
      if (shiftBasılıMı) {
        return "ڭ";
      }
      return "ن";

    case "o":
    case "O":
      if (kelimeBaşıMı(öncekiHarf)) {
        return "اۏ";
      }
      return "ۏ";

    case "ö":
    case "Ö":
      if (kelimeBaşıMı(öncekiHarf)) {
        return "اۊ";
      }
      return "ۊ";

    case "p":
    case "P":
      return "پ";

    case "r":
    case "R":
      if (capsLockBasılıMı) {
        return "\u0652"; // Sukun
      }
      return "ر";

    case "s":
    case "S":
      if (capsLockBasılıMı) {
        return "\u064D"; // Kesra Tenvin
      } else if (shiftBasılıMı) {
        return "ص";
      } else if (altBasılıMı) {
        return "ث";
      }
      return "س";

    case "ş":
    case "Ş":
      return "ش";

    case "t":
    case "T":
      if (capsLockBasılıMı) {
        return "\u0653"; // Med
      } else if (shiftBasılıMı) {
        return "ط";
      }
      return "ت";

    case "u":
    case "U":
      if (kelimeBaşıMı(öncekiHarf)) {
        return "اۆ";
      }
      return "ۆ";

    case "ü":
    case "Ü":
      if (kelimeBaşıMı(öncekiHarf)) {
        return "اۉ";
      }
      return "ۉ";

    case "v":
    case "V":
      if (capsLockBasılıMı) {
        return "\u0656"; // Elif Üst
      }
      return "و";

    case "y":
    case "Y":
      if (shiftBasılıMı) {
        return "ئ";
      }
      return "ي";
    // return "ى"

    case "z":
    case "Z":
      if (capsLockBasılıMı) {
        return "\u064F"; // Damme
      } else if (shiftBasılıMı) {
        return "ظ";
      } else if (altBasılıMı) {
        return "ذ";
      }
      return "ز";

    case "w":
    case "W":
      if (capsLockBasılıMı) {
        return "\u064B"; // Fetha Tenvin
      } else if (shiftBasılıMı) {
        return "\u0674"; // Hemze
      }
      return "\u200C"; // Harflerin birleşmesine mani oluyor

    case "x":
    case "X":
      if (capsLockBasılıMı) {
        return "\u064C"; // Damme Tenvin
      }
      return "";

    case "0":
      return "٠";

    case "1":
      return "١";

    case "2":
      return "٢";

    case "3":
      return "٣";

    case "4":
      return "٤";

    case "5":
      return "٥";

    case "6":
      return "٦";

    case "7":
      return "٧";

    case "8":
      return "٨";

    case "9":
      return "٩";

    default:
      return latiniHarf;
  }
}
