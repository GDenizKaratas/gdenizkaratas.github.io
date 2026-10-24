import { Component } from '@angular/core';
import { education, languages, roles } from '../content';

@Component({
  selector: 'app-experience-panel',
  template: `
    <div class="rows">
      @for (r of roles; track r.title) {
        <div class="role-row">
          @switch (r.logo.kind) {
            @case ('text') {
              <span class="logo text" aria-hidden="true">{{ $any(r.logo).text }}</span>
            }
            @case ('image') {
              <span class="logo" [class.dark]="$any(r.logo).dark" aria-hidden="true"><img [src]="$any(r.logo).src" alt="" /></span>
            }
          }
          <div class="role-body">
            <div class="role-head">
              <p><strong>{{ r.title }}</strong><span class="org"> · {{ r.org }}</span></p>
              <span class="year">{{ r.period }}</span>
            </div>
            @if (r.summary) {
              <p class="summary">{{ r.summary }}</p>
            }
            @if (r.highlights) {
              <ul class="highlights">
                @for (h of r.highlights; track h.name) {
                  <li [class.current]="h.current">
                    <span>
                      <strong>{{ h.name }}</strong>
                      @if (h.current) {
                        <span class="now"> · now</span>
                      }
                      <br /><span class="summary">{{ h.text }}</span>
                    </span>
                  </li>
                }
              </ul>
            }
          </div>
        </div>
      }

      <div class="role-row">
        <span class="logo fill" aria-hidden="true"><img src="images/logos/itu.png" alt="" /></span>
        <div class="role-body">
          @for (e of education; track e.title) {
            <div class="role-head">
              <p><strong>{{ e.title }}</strong><span class="org"> · {{ e.org }}</span></p>
              <span class="year">{{ e.period }}</span>
            </div>
            @if (e.note) {
              <p class="summary">{{ e.note }}</p>
            }
          }
        </div>
      </div>

      <div class="role-row">
        <span class="logo soft" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M3 12h18"></path><path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18"></path></svg>
        </span>
        <div class="role-body">
          <p><strong>Languages &amp; certifications</strong></p>
          @for (line of languages; track line) {
            <p class="summary">{{ line }}</p>
          }
        </div>
      </div>
    </div>
  `,
})
export class ExperiencePanel {
  protected readonly roles = roles;
  protected readonly education = education;
  protected readonly languages = languages;
}
