import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  emp = {
    fio: 'Иванов Иван Иванович',
    pos: 'Junior Front-end developer',
    img: 'assets/images/proger.jpg',
    cat: 'Ноутбуки',
    items: [
      { type: 'Монитор', model: '-', date: '-' },
      { type: 'Моноблок', model: '-', date: '-' },
      { type: 'Ноутбук', model: '-', date: '-' },
      { type: 'Клавиатура', model: '-', date: '-' },
      { type: 'Мышь', model: '-', date: '-' },
      { type: 'Кресло', model: '-', date: '-' },
      { type: 'Стол', model: '-', date: '-' }
    ]
  };
  constructor() {}

  ngOnInit() {}
}
