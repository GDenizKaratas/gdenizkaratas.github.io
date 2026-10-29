import { Component, ElementRef, OnDestroy, signal, viewChild } from '@angular/core';
import { profile } from './content';
import { ProjectsPanel } from './panels/projects-panel';
import { ExperiencePanel } from './panels/experience-panel';
import { WritingPanel } from './panels/writing-panel';
import { BooksPanel } from './panels/books-panel';
import { CvPanel } from './panels/cv-panel';

type Tab = 'projects' | 'experience' | 'writing' | 'books' | 'cv';

// The card turns edge-on, the content swaps, then it comes back from the other side.
const TURN_OUT_MS = 200;
// Left-to-right order of the tabs; the CV tab sits at the far right.
const TAB_ORDER: Tab[] = ['projects', 'experience', 'writing', 'books', 'cv'];
// Phones stack the cards; past this point the tabs stick and a "Who am I?" button shows.
const STACKED_MAX_WIDTH = 1039;

@Component({
  selector: 'app-root',
  imports: [ProjectsPanel, ExperiencePanel, WritingPanel, BooksPanel, CvPanel],
  templateUrl: './app.html',
  host: { '(window:scroll)': 'onScroll()' },
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
  protected readonly phase = signal<'idle' | 'out' | 'in'>('idle');
  /** 1 when moving to a tab on the right, -1 to the left; mirrors the turn. */
  protected readonly turn = signal<1 | -1>(1);
  protected readonly stackOpen = signal(false);
  protected readonly stuck = signal(false);
  protected readonly showTop = signal(false);

  private readonly work = viewChild.required<ElementRef<HTMLElement>>('work');

  private timer?: ReturnType<typeof setTimeout>;

  protected pick(tab: Tab): void {
    if (tab === this.picked()) return;
    this.turn.set(TAB_ORDER.indexOf(tab) > TAB_ORDER.indexOf(this.picked()) ? 1 : -1);
    this.picked.set(tab);
    clearTimeout(this.timer);
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    // On phones, start the new section from its top instead of mid-page.
    const work = this.work().nativeElement;
    if (this.stacked() && work.getBoundingClientRect().top < 0) {
      work.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
    }
    if (reduce) {
      this.shown.set(tab);
      return;
    }
    this.phase.set('out');
    this.timer = setTimeout(() => {
      this.shown.set(tab);
      this.phase.set('in');
      // Let the browser paint the far-side start before animating back.
      this.timer = setTimeout(() => this.phase.set('idle'), 30);
    }, TURN_OUT_MS);
  }

  protected onScroll(): void {
    const stacked = this.stacked();
    this.stuck.set(stacked && this.work().nativeElement.getBoundingClientRect().top <= 0);
    this.showTop.set(this.stuck());
  }

  protected toTop(): void {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  }

  private stacked(): boolean {
    return window.innerWidth <= STACKED_MAX_WIDTH;
  }

  ngOnDestroy(): void {
    clearTimeout(this.timer);
  }
}
