import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class FakeBackendService implements InMemoryDbService {
  createDb() {

    const items = [
      {
        id: '1',
        name: 'Benq xl2411',
        serNumber: 123456789,
        type: 'Монитор',
        emp: {
          id: '1',
          fio : 'Иванов Иван Иванович'
        },
        date: '22.11.2017',
        status: 'Хорошее',
        history: [
          {
            reason: 'Поломка дисплея',
            indate: '11.11.2018',
            outdate: '13.11.2018',
            serviceCenter: 'Неофициальный'
          },
          {
            reason: 'Поломка дисплея',
            indate: '01.03.2019',
            outdate: '02.03.2019',
            serviceCenter: 'Официальный'
          }
        ]
      },
      {
        id: '2',
        name: 'Benq GL2450',
        serNumber: 123456789,
        type: 'Монитор',
        emp: {
          id: '2',
          fio : 'Петров Иван Петрович'
        },
        date: '25.12.2016',
        status: 'Ремонтируется',
        history: [
          {
            reason: 'Поломка Benq',
            indate: '11.11.2018',
            outdate: '13.11.2018',
            serviceCenter: 'Неофициальный'
          },
          {
            reason: 'Поломка Benq',
            indate: '01.03.2019',
            outdate: '02.03.2019',
            serviceCenter: 'Официальный'
          }
        ]
      },
      {
        id: '3',
        name: 'Apple iMac 21.5"',
        serNumber: 123456789,
        type: 'Моноблок',
        emp: {
          id: '3',
          fio : 'Петров Петр Петрович'
        },
        date: '01.03.2018	',
        status: 'Хорошее',
        history: [
          {
            reason: 'Поломка Apple iMac 21.5"',
            indate: '11.11.2018',
            outdate: '13.11.2018',
            serviceCenter: 'Неофициальный'
          },
          {
            reason: 'Поломка Apple iMac 21.5"',
            indate: '01.03.2019',
            outdate: '02.03.2019',
            serviceCenter: 'Официальный'
          }
        ]
      },
      {
        id: '4',
        name: 'Apple MacBook Air 2018',
        serNumber: 123456789,
        type: 'Ноутбук',
        emp: {
          id: '4',
          fio : 'Иванов Иван Сидорович'
        },
        date: '22.11.2017',
        status: 'Хорошее',
        history: [
          {
            reason: 'Поломка Apple MacBook Air 2018',
            indate: '11.11.2018',
            outdate: '13.11.2018',
            serviceCenter: 'Неофициальный'
          },
          {
            reason: 'Поломка Apple MacBook Air 2018',
            indate: '01.03.2019',
            outdate: '02.03.2019',
            serviceCenter: 'Официальный'
          }
        ]
      },
      {
        id: '5',
        name: 'Lenovo ThinkPad',
        serNumber: 123456789,
        type: 'Ноутбук',
        emp: {
          id: '5',
          fio : 'Петров Иван Петрович'
        },
        date: '25.12.2016',
        status: 'Хорошее',
        history: [
          {
            reason: 'Поломка Lenovo ThinkPad',
            indate: '11.11.2018',
            outdate: '13.11.2018',
            serviceCenter: 'Неофициальный'
          },
          {
            reason: 'Поломка Lenovo ThinkPad',
            indate: '01.03.2019',
            outdate: '02.03.2019',
            serviceCenter: 'Официальный'
          }
        ]
      },
    ];
    const emps = [
      {
        id: '1',
        fio: 'Иванов Иван Иванович',
        pos: 'Junior Front-end developer',
        dep: 'WEB Front-end',
        indate: '11.11.2011',
        cat: 'Ноутбуки',
        img: 'assets/images/proger.jpg',
        items: [
          { type: 'Монитор', model: '-', date: '-' },
          { type: 'Моноблок', model: '-', date: '-' },
          { type: 'Ноутбук', model: '-', date: '-' },
          { type: 'Клавиатура', model: '-', date: '-' },
          { type: 'Мышь', model: '-', date: '-' },
          { type: 'Кресло', model: '-', date: '-' },
          { type: 'Стол', model: '-', date: '-' }
        ]
      },
      {
        id: '2',
        fio: 'Петров Иван Петрович',
        pos: 'Junior Front-end developer',
        dep: 'WEB Back-end	',
        indate: '12.12.2012',
        cat: 'Моноблоки',
        img: 'assets/images/proger.jpg',
        items: [
          { type: 'Монитор', model: '-', date: '-' },
          { type: 'Моноблок', model: '-', date: '-' },
          { type: 'Ноутбук', model: '-', date: '-' },
          { type: 'Клавиатура', model: '-', date: '-' },
          { type: 'Мышь', model: '-', date: '-' },
          { type: 'Кресло', model: '-', date: '-' },
          { type: 'Стол', model: '-', date: '-' }
        ]
      },
      {
        id: '3',
        fio: 'Петров Петр Петрович',
        pos: 'Junior Front-end developer',
        dep: 'Android Back-end',
        indate: '10.10.2010',
        cat: 'Клавиатуры',
        img: 'assets/images/proger.jpg',
        items: [
          { type: 'Монитор', model: '-', date: '-' },
          { type: 'Моноблок', model: '-', date: '-' },
          { type: 'Ноутбук', model: '-', date: '-' },
          { type: 'Клавиатура', model: '-', date: '-' },
          { type: 'Мышь', model: '-', date: '-' },
          { type: 'Кресло', model: '-', date: '-' },
          { type: 'Стол', model: '-', date: '-' }
        ]
      },
      {
        id: '4',
        fio : 'Иванов Иван Сидорович',
        pos: 'Junior Front-end developer',
        dep: 'Android Back-end',
        indate: '10.10.2010',
        cat: 'Клавиатуры',
        img: 'assets/images/proger.jpg',
        items: [
          { type: 'Монитор', model: '-', date: '-' },
          { type: 'Моноблок', model: '-', date: '-' },
          { type: 'Ноутбук', model: '-', date: '-' },
          { type: 'Клавиатура', model: '-', date: '-' },
          { type: 'Мышь', model: '-', date: '-' },
          { type: 'Кресло', model: '-', date: '-' },
          { type: 'Стол', model: '-', date: '-' }
        ]
      },
      {
        id: '5',
        fio : 'Петров Иван Петрович',
        pos: 'Junior Front-end developer',
        dep: 'Android Back-end',
        indate: '10.10.2010',
        cat: 'Клавиатуры',
        img: 'assets/images/proger.jpg',
        items: [
          { type: 'Монитор', model: '-', date: '-' },
          { type: 'Моноблок', model: '-', date: '-' },
          { type: 'Ноутбук', model: '-', date: '-' },
          { type: 'Клавиатура', model: '-', date: '-' },
          { type: 'Мышь', model: '-', date: '-' },
          { type: 'Кресло', model: '-', date: '-' },
          { type: 'Стол', model: '-', date: '-' }
        ]
      },
    ];
    return {items, emps};
  }
}
