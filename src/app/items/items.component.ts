import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  title = 'Инвентарные единицы | Главная страница';
  filters = {};
  items = [
    {
      name: 'Benq xl2411',
      serNumber: 123456789,
      type: 'Монитор',
      emp: 'Иванов Иван Иванович',
      date: '22.11.2017',
      inf: 'Хорошее'
    },
    {
      name: 'Benq GL2450',
      serNumber: 123456789,
      type: 'Монитор',
      emp: 'Петров Иван Петрович	',
      date: '25.12.2016',
      inf: 'Ремонтируется'
    },
    {
      name: 'Apple iMac 21.5"',
      serNumber: 123456789,
      type: 'Моноблок',
      emp: 'Петров Петр Петрович',
      date: '01.03.2018	',
      inf: 'Хорошее'
    }
  ];
  constructor() {}

  ngOnInit() {}
}
