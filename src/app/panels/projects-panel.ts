import { Component } from '@angular/core';
import { Project, projects } from '../content';

@Component({
  selector: 'app-projects-panel',
  template: `
    @for (section of sections; track section.id) {
      <section class="project-group" [attr.aria-label]="section.title">
        <p class="eyebrow group-title">{{ section.title }}</p>
        <div class="rows">
          @for (p of section.items; track p.name) {
            <article class="project" [class.featured]="p.story">
              <img class="thumb" [src]="p.image" [alt]="p.imageAlt" width="184" height="115" loading="lazy" />
              <div class="project-body">
                <div class="title-row">
                  <h3>
                    @if (p.links[0]; as link) {
                      <a class="title-link" [href]="link.url" target="_blank" rel="noopener">{{ p.name }}</a>
                    } @else {
                      {{ p.name }}
                    }
                    <span class="year">{{ p.year }}</span>
                  </h3>
                  @if (p.status) {
                    <span class="status">{{ p.status }}</span>
                  }
                </div>

                <p class="summary">{{ p.summary }}</p>

                <div class="meta-row">
                  <div class="icons" role="list" [attr.aria-label]="'Built with ' + techNames(p)">
                    @for (t of p.tech; track t.name) {
                      <span class="tip" role="listitem" tabindex="0" [attr.data-tip]="t.name" [attr.aria-label]="t.name">
                        <img [src]="t.icon" alt="" width="18" height="18" />
                      </span>
                    }
                  </div>
                  @if (p.proof) {
                    <span class="proof">{{ p.proof }}</span>
                  }
                  <span class="actions">
                    @for (link of p.links; track link.url) {
                      <a class="chip-link" [href]="link.url" target="_blank" rel="noopener">
                        <img src="images/icons/github.svg" alt="" />{{ link.label }}
                      </a>
                    } @empty {
                      @if (p.client) {
                        <span class="private">
                          <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="13" rx="2"></rect><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"></path></svg>
                          Client work · {{ p.client }}
                        </span>
                      } @else {
                        <span class="private">
                          <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="11" width="16" height="10" rx="2"></rect><path d="M8 11V7a4 4 0 0 1 8 0v4"></path></svg>
                          Private repo
                        </span>
                      }
                    }
                  </span>
                </div>
              </div>
              @if (p.story; as story) {
                <dl class="story">
                  <dt>Problem</dt><dd>{{ story.problem }}</dd>
                  <dt>Approach</dt><dd>{{ story.approach }}</dd>
                  <dt>Key decision</dt><dd>{{ story.decision }}</dd>
                  @if (story.result) {
                    <dt>Result</dt><dd>{{ story.result }}</dd>
                  }
                </dl>
              }
            </article>
          }
        </div>
      </section>
    }
  `,
})
export class ProjectsPanel {
  protected readonly sections = [
    { id: 'featured', title: 'FEATURED' },
    { id: 'more', title: 'MORE PROJECTS' },
    { id: 'client', title: 'CLIENT WORK AT ARTEON' },
  ].map((s) => ({ ...s, items: projects.filter((p) => p.group === s.id) }));

  protected techNames(p: Project): string {
    return p.tech.map((t) => t.name).join(', ');
  }
}
