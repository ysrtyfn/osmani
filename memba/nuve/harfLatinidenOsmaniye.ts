import { kelimeBaşıMı } from "../aletler/kelimeBasiMi";

export function harfLatinidenOsmaniye(
  latiniHarf: string,
  öncekiHarf: string,
  shiftBasiliMi: boolean,
  altBasiliMi: boolean
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
    case "=":
      return "=";
    case ")":
      return ")";
    case "(":
      return "(";
    case "{":
      return "{";
    case "}":
      return "}";
    case "&":
      return "&";
    case "%":
      return "%";
    case "#":
      return "#";

    case "+":
      return "+";
    case "-":
      return "-";
    case "*":
      return "*";
    case "/":
      return "/";

    case "a":
    case "A":
      if (shiftBasiliMi) {
        return "ع";
      } else if (altBasiliMi) {
        // return "أ";
        return "\u0623";
      }
      return "ا";

    case "b":
    case "B":
      return "ب";

    case "c":
    case "C":
      return "ج";

    case "ç":
    case "Ç":
      return "چ";

    case "d":
    case "D":
      if (shiftBasiliMi) {
        return "ض";
      }
      return "د";

    case "e":
    case "E":
      return "ه" + "\u200C";

    case "f":
    case "F":
      return "ف";

    case "g":
    case "G":
      return "گ";

    case "ğ":
    case "Ğ":
      if (shiftBasiliMi) {
        return "ػ";
      }
      return "غ";

    case "h":
    case "H":
      if (shiftBasiliMi) {
        return "خ";
      } else if (altBasiliMi) {
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
      return "ق";

    case "l":
    case "L":
      return "ل";

    case "m":
    case "M":
      return "م";

    case "n":
    case "N":
      if (shiftBasiliMi) {
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
      return "ر";

    case "s":
    case "S":
      if (shiftBasiliMi) {
        return "ص";
      } else if (altBasiliMi) {
        return "ث";
      }
      return "س";

    case "ş":
    case "Ş":
      return "ش";

    case "t":
    case "T":
      if (shiftBasiliMi) {
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
      return "و";

    case "y":
    case "Y":
      if (shiftBasiliMi) {
        return "ئ";
      }
      return "ي";
    // return "ى"

    case "z":
    case "Z":
      if (shiftBasiliMi) {
        return "ظ";
      } else if (altBasiliMi) {
        return "ذ";
      }
      return "ز";

    case "w":
    case "W":
      if (shiftBasiliMi) {
        return "ء";
      }
      return "\u200C";

    case "x":
    case "X":
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
      return "-";
  }
}
