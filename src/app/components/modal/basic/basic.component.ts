import { Component} from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';

export interface AlertModel {
  title?: string;
  message: string;
}
@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicComponent extends SimpleModalComponent<AlertModel, null> implements AlertModel {
  title: string = '';
  message: string = '';
  constructor() {
    super();
  }

  confirm() {
    this.close();
  }

}