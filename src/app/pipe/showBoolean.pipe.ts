import { Pipe, PipeTransform } from '@angular/core';
import { IFecha } from '../model/model-interfaces';

@Pipe({ name: 'showBoolean' })
export class showBooleanPipe implements PipeTransform {
    transform(value: boolean) {
        if (value) {
            return '<i class="fas fa-check text-success"></i>';
        } else {
            return '<i class="fas fa-times text-danger"></i>';
        }
    }
}