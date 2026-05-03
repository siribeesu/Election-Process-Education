import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <a routerLink="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="bg-primary text-primary-foreground p-1.5 rounded-md group-hover:bg-primary/90 transition-colors">
            <!-- Icon replaced with SVG for 1:1 look without extra libs -->
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="22" x2="21" y2="22"></line><line x1="6" y1="18" x2="6" y2="11"></line><line x1="10" y1="18" x2="10" y2="11"></line><line x1="14" y1="18" x2="14" y2="11"></line><line x1="18" y1="18" x2="18" y2="11"></line><polygon points="12 2 2 7 22 7 12 2"></polygon></svg>
          </div>
          <span className="font-semibold text-lg tracking-tight text-foreground">Civic Guide</span>
        </a>
        
        <nav className="hidden md:flex items-center gap-6">
          <ng-container *ngFor="let link of links">
            <a 
              [routerLink]="link.href"
              routerLinkActive="text-primary"
              [routerLinkActiveOptions]="{exact: true}"
              className="text-sm font-medium transition-colors hover:text-primary text-muted-foreground"
            >
              {{link.label}}
            </a>
          </ng-container>
        </nav>

        <div className="md:hidden">
          <a routerLink="/assistant">
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              Ask
            </button>
          </a>
        </div>
      </div>
    </header>
  `
})
export class NavbarComponent {
  links = [
    { href: "/voter-journey", label: "Voter Journey" },
    { href: "/ballot", label: "My Ballot" },
    { href: "/polling-places", label: "Polling Places" },
    { href: "/myths", label: "Fact Check" },
    { href: "/assistant", label: "AI Assistant" },
  ];
}
