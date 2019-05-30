import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class FakeBackendService implements InMemoryDbService {
  createDb() {
    const itemCategories = [
      {
        name: 'Мониторы',
        label: 'monitors',
        itemLabel: 'Монитор'
      },
      {
        name: 'Моноблоки',
        label: 'monoblocks',
        itemLabel: 'Моноблок'
      },
      {
        name: 'Ноутбуки',
        label: 'laptops',
        itemLabel: 'Ноутбук'
      },
      {
        name: 'Клавиатуры',
        label: 'keyboards',
        itemLabel: 'Клавиатура'
      },
      {
        name: 'Мыши',
        label: 'mouses',
        itemLabel: 'Мышь'
      },
      {
        name: 'Столы',
        label: 'tables',
        itemLabel: 'Стол'
      },
      {
        name: 'Кресла',
        label: 'armchairs',
        itemLabel: 'Кресло'
      }
    ];

    const departments = [
      {
        name: 'WEB Front-end',
        label: 'web-front-end',
      },
      {
        name: 'WEB Back-end',
        label: 'web-back-end',
      },
      {
        name: 'Android Front-end',
        label: 'android-front-end',
      },
      {
        name: 'Android Back-end',
        label: 'android-back-end',
      },
      {
        name: 'iOS Front-end',
        label: 'ios-front-end',
      },
      {
        name: 'iOS Back-end',
        label: 'ios-back-end',
      }
    ];

    const items = [
      {
        id: 1,
        name: 'Benq xl2411',
        serNumber: 291156836,
        category: 'Мониторы',
        categoryLabel: 'monitors',
        type: 'Монитор',
        empId: 1,
        empFio: 'Иванов Иван Иванович',
        date: '11/22/2017',
        status: 'Хорошее',
        history: [
          {
            reason: 'Поломка дисплея',
            indate: '11/11/2018',
            outdate: '11/13/2018',
            serviceCenter: 'Неофициальный'
          },
          {
            reason: 'Поломка дисплея',
            indate: '02/15/2019',
            outdate: '02/18/2019',
            serviceCenter: 'Официальный'
          }
        ]
      },
      {
        id: 2,
        name: 'Benq GL2450',
        serNumber: 439554597,
        category: 'Мониторы',
        categoryLabel: 'monitors',
        type: 'Монитор',
        empId: 2,
        empFio: 'Петров Иван Петрович',
        date: '03/20/2019',
        status: 'Ремонтируется',
        history: [
          {
            reason: 'Поломка Benq',
            indate: '03/25/2019',
            outdate: '03/27/2019',
            serviceCenter: 'Неофициальный'
          },
          {
            reason: 'Поломка Benq',
            indate: '04/03/2019',
            outdate: '04/06/2019',
            serviceCenter: 'Официальный'
          }
        ]
      },
      {
        id: 3,
        name: 'Apple iMac 21.5"',
        serNumber: 557160155,
        category: 'Моноблоки',
        categoryLabel: 'monoblocks',
        type: 'Моноблок',
        empId: 3,
        empFio: 'Петров Петр Петрович',
        date: '04/08/2019',
        status: 'Хорошее',
        history: [
          {
            reason: 'Поломка Apple iMac 21.5"',
            indate: '04/12/2019',
            outdate: '04/15/2019',
            serviceCenter: 'Неофициальный'
          },
          {
            reason: 'Поломка Apple iMac 21.5"',
            indate: '04/16/2019',
            outdate: '04/17/2019',
            serviceCenter: 'Официальный'
          }
        ]
      },
      {
        id: 4,
        name: 'Apple MacBook Air 2018',
        serNumber: 784640288,
        category: 'Ноутбуки',
        categoryLabel: 'laptops',
        type: 'Ноутбук',
        empId: 4,
        empFio: 'Иванов Иван Сидорович',
        date: '11/22/2017',
        status: 'Хорошее',
        history: [
          {
            reason: 'Поломка Apple MacBook Air 2018',
            indate: '04/16/2019',
            outdate: '04/17/2019',
            serviceCenter: 'Неофициальный'
          },
          {
            reason: 'Поломка Apple MacBook Air 2018',
            indate: '04/16/2019',
            outdate: '04/17/2019',
            serviceCenter: 'Официальный'
          }
        ]
      },
      {
        id: 5,
        name: 'Lenovo ThinkPad',
        serNumber: 409813163,
        category: 'Ноутбуки',
        categoryLabel: 'laptops',
        type: 'Ноутбук',
        empId: 5,
        empFio: 'Петров Иван Петрович',
        date: '12/26/2016',
        status: 'Хорошее',
        history: [
          {
            reason: 'Поломка Lenovo ThinkPad',
            indate: '01/07/2018',
            outdate: '01/09/2018',
            serviceCenter: 'Неофициальный'
          },
          {
            reason: 'Поломка Lenovo ThinkPad',
            indate: '01/16/2018',
            outdate: '01/17/2018',
            serviceCenter: 'Официальный'
          }
        ]
      },
    ];
    const emps = [
      {
        id: 1,
        fio: 'Иванов Иван Иванович',
        pos: 'Junior Front-end developer',
        dep: 'WEB Front-end',
        depLabel: 'web-front-end',
        startWorking: '11.11.2011',
        cat: 'Ноутбуки',
        catLabel: 'laptops',
        img: 'assets/images/proger.jpg',
        items: [
          { id: 1, type: 'Монитор', model: '-', date: '-' },
          { id: 2, type: 'Моноблок', model: '-', date: '-' },
          { id: 3, type: 'Ноутбук', model: '-', date: '-' },
          { id: 4, type: 'Клавиатура', model: '-', date: '-' },
          { id: 5, type: 'Мышь', model: '-', date: '-' },
          { id: 6, type: 'Кресло', model: '-', date: '-' },
          { id: 7, type: 'Стол', model: '-', date: '-' }
        ]
      },
      {
        id: 2,
        fio: 'Иванов Иван Петрович',
        pos: 'Junior Front-end developer',
        dep: 'WEB Back-end',
        depLabel: 'web-back-end',
        startWorking: '12.12.2012',
        cat: 'Моноблоки',
        catLabel: 'monoblocks',
        img: 'assets/images/proger.jpg',
        items: [
          { id: 1, type: 'Монитор', model: '-', date: '-' },
          { id: 2, type: 'Моноблок', model: '-', date: '-' },
          { id: 3, type: 'Ноутбук', model: '-', date: '-' },
          { id: 4, type: 'Клавиатура', model: '-', date: '-' },
          { id: 5, type: 'Мышь', model: '-', date: '-' },
          { id: 6, type: 'Кресло', model: '-', date: '-' },
          { id: 7, type: 'Стол', model: '-', date: '-' }
        ]
      },
      {
        id: 3,
        fio: 'Петров Петр Петрович',
        pos: 'Junior Android developer',
        dep: 'Android Front-end',
        depLabel: 'android-front-end',
        startWorking: '10.10.2010',
        cat: 'Клавиатуры',
        catLabel: 'keyboards',
        img: 'assets/images/proger.jpg',
        items: [
          { id: 1, type: 'Монитор', model: '-', date: '-' },
          { id: 2, type: 'Моноблок', model: '-', date: '-' },
          { id: 3, type: 'Ноутбук', model: '-', date: '-' },
          { id: 4, type: 'Клавиатура', model: '-', date: '-' },
          { id: 5, type: 'Мышь', model: '-', date: '-' },
          { id: 6, type: 'Кресло', model: '-', date: '-' },
          { id: 7, type: 'Стол', model: '-', date: '-' }
        ]
      },
      {
        id: 4,
        fio : 'Иванов Пётр Петрович',
        pos: 'Middle Android developer',
        dep: 'Android Back-end',
        depLabel: 'android-back-end',
        startWorking: '10.10.2010',
        cat: 'Столы',
        catLabel: 'tables',
        img: 'assets/images/proger.jpg',
        items: [
          { id: 1, type: 'Монитор', model: '-', date: '-' },
          { id: 2, type: 'Моноблок', model: '-', date: '-' },
          { id: 3, type: 'Ноутбук', model: '-', date: '-' },
          { id: 4, type: 'Клавиатура', model: '-', date: '-' },
          { id: 5, type: 'Мышь', model: '-', date: '-' },
          { id: 6, type: 'Кресло', model: '-', date: '-' },
          { id: 7, type: 'Стол', model: '-', date: '-' }
        ]
      },
      {
        id: 5,
        fio : 'Петров Иван Петрович',
        pos: 'Senior IOS developer',
        dep: 'IOS Back-end',
        depLabel: 'ios-back-end',
        startWorking: '10.10.2010',
        cat: 'Мыши',
        catLabel: 'mouses',
        img: 'assets/images/proger.jpg',
        items: [
          { id: 1, type: 'Монитор', model: '-', date: '-' },
          { id: 2, type: 'Моноблок', model: '-', date: '-' },
          { id: 3, type: 'Ноутбук', model: '-', date: '-' },
          { id: 4, type: 'Клавиатура', model: '-', date: '-' },
          { id: 5, type: 'Мышь', model: '-', date: '-' },
          { id: 6, type: 'Кресло', model: '-', date: '-' },
          { id: 7, type: 'Стол', model: '-', date: '-' }
        ]
      },
      {
        id: 6,
        fio : 'Петров Сидор Петрович',
        pos: 'Middle IOS developer',
        dep: 'IOS Front-end',
        depLabel: 'ios-front-end',
        startWorking: '10.10.2010',
        cat: 'Кресла',
        catLabel: 'armchairs',
        img: 'assets/images/proger.jpg',
        items: [
          { id: 1, type: 'Монитор', model: '-', date: '-' },
          { id: 2, type: 'Моноблок', model: '-', date: '-' },
          { id: 3, type: 'Ноутбук', model: '-', date: '-' },
          { id: 4, type: 'Клавиатура', model: '-', date: '-' },
          { id: 5, type: 'Мышь', model: '-', date: '-' },
          { id: 6, type: 'Кресло', model: '-', date: '-' },
          { id: 7, type: 'Стол', model: '-', date: '-' }
        ]
      },
    ];
    return {items, emps, itemCategories, departments};
  }
}
