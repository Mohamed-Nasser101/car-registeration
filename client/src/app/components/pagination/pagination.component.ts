import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input() PageCount: number;
  @Input() CurrentPage: number;
  @Output() pageChanged = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit(): void {
  }
  pages() {
    return new Array(this.PageCount);
  }
  changePage(page: number) {
    if (page != this.CurrentPage) {
      this.pageChanged.emit(page);
      this.CurrentPage = page;
    }
  }
  prev() {
    this.CurrentPage = this.CurrentPage - 1;
    this.pageChanged.emit(this.CurrentPage);
  }
  next() {
    this.CurrentPage = this.CurrentPage + 1;
    this.pageChanged.emit(this.CurrentPage);
  }

}
