import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  title = 'Сотрудники | Главная страница';

  stuff = [
    {
      fio: 'Иванов Иван Иванович',
      dep: 'WEB Front-end',
      indate: '11.11.2011',
      cat: 'Ноутбуки'
    },
    {
      fio: 'Петров Иван Петрович',
      dep: 'WEB Back-end	',
      indate: '12.12.2012',
      cat: 'Моноблоки'
    },
    {
      fio: 'Петров Петр Петрович',
      dep: 'Android Back-end',
      indate: '10.10.2010',
      cat: 'Клавиатуры'
    }
  ];
  constructor() {}

  ngOnInit() {}
}
