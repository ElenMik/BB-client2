import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'trim' })
export class TrimPipe implements PipeTransform {
    transform(strText2Trim: string, longitud: number = 25) {
        if (strText2Trim) {
            if (strText2Trim.length > longitud) {
                return strText2Trim.substring(0, longitud) + " ...";
            } else {
                return strText2Trim;
            }
        } else {
            return "";
        }
    }
}