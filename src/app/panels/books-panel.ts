import { Component } from '@angular/core';
import { books } from '../content';

@Component({
  selector: 'app-books-panel',
  template: `
    <div class="rows">
      @for (book of books; track book.title) {
        <article class="book">
          <img [src]="book.cover" [alt]="'Cover of ' + book.title" width="72" height="96" loading="lazy" />
          <div class="role-body">
            <h3>{{ book.title }}</h3>
            <p class="author">{{ book.author }}</p>
            <p class="summary">{{ book.note }}</p>
          </div>
        </article>
      }
    </div>
  `,
})
export class BooksPanel {
  protected readonly books = books;
}
