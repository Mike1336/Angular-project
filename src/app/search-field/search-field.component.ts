import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.scss']
})
export class SearchFieldComponent {

  @Input() searchQuery: string;
  @Output() searchQueryChange = new EventEmitter<string>();
  onSearchQueryChange(newQuery: string) {
      this.searchQuery = newQuery;
      this.searchQueryChange.emit(newQuery);
  }
}
