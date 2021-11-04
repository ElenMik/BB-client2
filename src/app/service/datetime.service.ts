import { Injectable } from "@angular/core";
import { IFecha } from "../model/model-interfaces";

@Injectable({
    providedIn: 'root'
})

export class DateTimeService {
    constructor() { }

    fechaHoraPattern: string = "^([1-9]|([012][0-9])|(3[01]))-([0]{0,1}[1-9]|1[012])-\d\d\d\d [012]{0,1}[0-9]:[0-6][0-9]$"

    getDoubleDigitStr = (nData: number): string => {
        if (nData <= 9) {
            return "0" + nData;
        } else {
            return "" + nData;
        }
    }

    getStrFecha2Show = (oFecha: IFecha): string => {
        return this.getDoubleDigitStr(oFecha.date.day) + "-" + this.getDoubleDigitStr(oFecha.date.month) + "-" + oFecha.date.year + " " + this.getDoubleDigitStr(oFecha.time.hour) + ":" + this.getDoubleDigitStr(oFecha.time.minute);
    }

    getStrFecha2Send = (oFecha: String): string => {
        return oFecha.split(" ")[0].split("-").reverse().join("-") + " " + oFecha.split(" ")[1];
    }

}