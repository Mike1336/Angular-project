import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  item: { model: string; serNumber: number; emp: string; history: {}[] } = {
    model: 'Ноутбук Acer',
    serNumber: 1234567890,
    emp: 'Иванов Иван Иванович',
    history: [
      { reason: 'Поломка дисплея', indate: '11.11.2018', outdate: '13.11.2018', serviceCenter: 'Неофициальный' },
      { reason: 'Поломка блока питания	', indate: '01.03.2019', outdate: '02.03.2019', serviceCenter: 'Неофициальный'},
    ]
  };

  constructor() { }

  ngOnInit() {
  }

}
