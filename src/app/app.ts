import { Component, OnDestroy, signal } from '@angular/core';
import { profile } from './content';
import { ProjectsPanel } from './panels/projects-panel';
import { ExperiencePanel } from './panels/experience-panel';
import { WritingPanel } from './panels/writing-panel';
import { BooksPanel } from './panels/books-panel';

type Tab = 'projects' | 'experience' | 'writing' | 'books';

// Half of the flip: the card turns edge-on, content swaps, then it turns back.
const TURN_MS = 260;

@Component({
  selector: 'app-root',
  imports: [ProjectsPanel, ExperiencePanel, WritingPanel, BooksPanel],
  templateUrl: './app.html',
})
export class App implements OnDestroy {
  protected readonly profile = profile;
  protected readonly tabs: { id: Tab; label: string }[] = [
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'writing', label: 'Writing' },
    { id: 'books', label: 'Books' },
  ];

  /** The tab whose content is on the card right now. */
  protected readonly shown = signal<Tab>('projects');
  /** The tab the visitor picked; leads `shown` while the card is turning. */
  protected readonly picked = signal<Tab>('projects');
  protected readonly turning = signal(false);

  private timer?: ReturnType<typeof setTimeout>;

  protected pick(tab: Tab): void {
    if (tab === this.picked()) return;
    this.picked.set(tab);
    clearTimeout(this.timer);
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.shown.set(tab);
      return;
    }
    this.turning.set(true);
    this.timer = setTimeout(() => {
      this.shown.set(tab);
      this.turning.set(false);
    }, TURN_MS);
  }

  ngOnDestroy(): void {
    clearTimeout(this.timer);
  }
}
