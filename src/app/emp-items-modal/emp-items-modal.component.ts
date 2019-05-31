import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-emp-items-modal',
  templateUrl: './emp-items-modal.component.html',
  styleUrls: ['./emp-items-modal.component.scss']
})
export class EmpItemsModalComponent implements OnInit {

  public show = false;
  public empId: number;
  public empFio: string;
  public currentItem: any;
  public items: any;
  public newEmpItem = {
    type: '',
    modelId: null,
    modelName: '',
    date: '',
  };

  @Output() itemEdited = new EventEmitter<boolean>();
  @Output() editCanceled = new EventEmitter<boolean>();

  constructor(private itemService: ItemService) { }

  ngOnInit() {
  }

  public editItem() {
    const now = new Date();
    // двузначный формат, добавление 0 к однозначным
    const dd = String(now.getDate()).padStart(2, '0');
    // январь - нулевой месяц
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const yyyy = now.getFullYear();
    const today = `${mm}/${dd}/${yyyy}`;
    if (this.newEmpItem.modelName !== '-') {
      this.items.forEach(element => {
          if (element.name === this.newEmpItem.modelName) {
            this.newEmpItem.modelId = element.id;
            this.newEmpItem.date = today;
            element.empId = this.empId;
            element.empFio = this.empFio;
            this.itemService.updateItem(element).subscribe();
          }
      });
    } else {
      this.newEmpItem.modelId = null;
      this.newEmpItem.date = '-';
      this.currentItem.empId = null;
      this.currentItem.empFio = '';
      this.itemService.updateItem(this.currentItem).subscribe();
    }
    this.itemEdited.emit(true);
    this.show = false;
}
  public closeModal() {
    this.show = false;
  }
}
