import { Component } from '@angular/core';
import { profile } from '../content';

@Component({
  selector: 'app-cv-panel',
  template: `
    <div class="cv-bar">
      <a class="btn cv-open" [href]="profile.cv" target="_blank" rel="noopener">Open full size ↗</a>
      <a class="btn cv-download" [href]="profile.cv" download>
        <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"></path><path d="M7 10l5 5 5-5"></path><path d="M5 21h14"></path></svg>
        Download PDF
      </a>
    </div>
    <a class="cv-page-link" [href]="profile.cv" target="_blank" rel="noopener" title="Open full size">
      <img class="cv-page" [src]="profile.cvPreview" [alt]="'CV of ' + profile.name" width="1240" height="1755" />
    </a>
  `,
})
export class CvPanel {
  protected readonly profile = profile;
}
