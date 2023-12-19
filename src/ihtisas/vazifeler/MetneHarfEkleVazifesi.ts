import { latinidenOsmaniye } from "@/nuve/latinidenOsmaniye";

let öncekiHarf = "";
let ctrlBasiliMi = false;
let shiftBasiliMi = false;
let altBasiliMi = false;

export const MetneHarfEkleVazifesi = () => {};

export const tuşaBasmaHadisesi = (event: KeyboardEvent, metin: string, değiştirMetni: (data: string) => void) => {
  var tuşİsmi = event.key;
  // var code = event.code;

  if (tuşİsmi === "Space" || tuşİsmi === " ") {
    event.preventDefault();
  }

  if (tuşİsmi === "Backspace") {
    if (metin.endsWith("\u200C")) {
      metin = metin.slice(0, -2);
    } else {
      metin = metin.slice(0, -1);
    }
    öncekiHarf = metin.slice(-1);
    değiştirMetni(metin);
  } else if (tuşİsmi === "Delete") {
    öncekiHarf = "";
    değiştirMetni("");
  } else if (tuşİsmi === "Control") {
    ctrlBasiliMi = true;
  } else if (tuşİsmi === "Shift") {
    shiftBasiliMi = true;
  } else if (tuşİsmi === "Alt") {
    altBasiliMi = true;
  } else {
    let harf = latinidenOsmaniye(tuşİsmi, öncekiHarf, ctrlBasiliMi, shiftBasiliMi, altBasiliMi);
    if (öncekiHarf === "ا" && harf === "ا") {
      metin = metin.slice(0, -1);
      öncekiHarf = "آ";
      harf = "آ";
    } else if (harf !== "" && harf !== "-") {
      öncekiHarf = harf;
    }

    değiştirMetni(metin + harf);
  }
};

export const tuşuBırakmaHadisesi = (event: KeyboardEvent) => {
  event.preventDefault();

  var tuşİsmi = event.key;
  // var code = event.code;

  if (tuşİsmi === "Control") {
    ctrlBasiliMi = false;
  } else if (tuşİsmi === "Shift") {
    shiftBasiliMi = false;
  } else if (tuşİsmi === "Alt") {
    altBasiliMi = false;
  }

  // console.log("keyup " + tuşİsmi)
};
