import { Component } from '@angular/core';
import { posts } from '../content';

@Component({
  selector: 'app-writing-panel',
  template: `
    <div class="rows">
      @for (post of posts; track post.title) {
        <a class="post" [href]="post.url" target="_blank" rel="noopener">
          <img [src]="post.image" alt="" width="88" height="88" loading="lazy" />
          <span class="post-body">
            <span class="post-meta">
              <span class="platform" [class.medium]="post.platform === 'Medium article'">
                <img [src]="post.platform === 'Medium article' ? 'images/icons/medium.svg' : 'images/icons/linkedin.svg'" alt="" />
                {{ post.platform }}
              </span>
              {{ post.date }}
            </span>
            <h3>{{ post.title }} ↗</h3>
            <span class="summary">{{ post.summary }}</span>
          </span>
        </a>
      }
    </div>
  `,
})
export class WritingPanel {
  protected readonly posts = posts;
}
