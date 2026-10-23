import { Component } from '@angular/core';
import { projects } from '../content';

@Component({
  selector: 'app-projects-panel',
  template: `
    <div class="rows">
      @for (p of projects; track p.name) {
        <article class="project">
          <img class="thumb" [src]="p.image" [alt]="p.imageAlt" width="184" height="115" loading="lazy" />
          <div class="project-body">
            <div class="title-row">
              <h3>
                @if (p.links[0]; as link) {
                  <a [href]="link.url" target="_blank" rel="noopener" style="color: inherit; text-decoration: none">{{ p.name }}</a>
                } @else {
                  {{ p.name }}
                }
                <span class="year">{{ p.year }}</span>
              </h3>
              @if (p.status) {
                <span class="status">{{ p.status }}</span>
              }
            </div>
            <p class="summary">
              @if (p.client) {
                <span class="client">{{ p.client }}</span>
              }
              {{ p.summary }}
            </p>
            <div class="meta-row">
              <div class="icons" role="list" [attr.aria-label]="'Built with ' + techNames(p.tech)">
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
                  <span class="private">
                    <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="11" width="16" height="10" rx="2"></rect><path d="M8 11V7a4 4 0 0 1 8 0v4"></path></svg>
                    Private repo
                  </span>
                }
              </span>
            </div>
          </div>
        </article>
      }
    </div>
  `,
})
export class ProjectsPanel {
  protected readonly projects = projects;
  protected techNames(tech: { name: string }[]): string {
    return tech.map((t) => t.name).join(', ');
  }
}
