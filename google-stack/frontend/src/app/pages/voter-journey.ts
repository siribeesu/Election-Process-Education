import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElectionService, VoterJourney } from '../services/election.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-voter-journey',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mx-auto px-4 py-12 max-w-4xl">
      <div class="text-center mb-12">
        <h1 class="text-3xl font-bold tracking-tight mb-4">Your Voter Journey</h1>
        <p class="text-muted-foreground max-w-2xl mx-auto">
          Select your state to see a step-by-step guide to participating in the upcoming election.
        </p>
      </div>

      <div class="flex justify-center mb-12">
        <div class="w-full max-w-xs">
          <label class="block text-sm font-medium mb-2 text-center">Select Your State</label>
          <select [(ngModel)]="selectedState" (change)="loadJourney()" class="w-full p-2 border rounded">
            <option value="CA">California</option>
            <option value="TX">Texas</option>
            <option value="NY">New York</option>
            <option value="FL">Florida</option>
          </select>
        </div>
      </div>

      <div *ngIf="loading()" class="space-y-6">
        <div *ngFor="let i of [1,2,3]" class="animate-pulse bg-muted/20 h-32 rounded-xl border"></div>
      </div>

      <div *ngIf="!loading() && data()" class="relative border-l-2 border-primary/20 ml-4 md:ml-8 space-y-8 pb-8">
        <div *ngFor="let step of data()?.steps" class="relative pl-8 md:pl-12">
          <!-- Step indicator and Card UI (replicate Tailwind classes exactly) -->
          <div class="bg-white p-6 rounded-xl border shadow-sm">
             <h3 class="text-xl font-bold">{{step.title}}</h3>
             <p class="text-muted-foreground mt-2">{{step.description}}</p>
             <a *ngIf="step.link" [href]="step.link" target="_blank" class="mt-4 inline-block text-primary font-medium">{{step.linkText}}</a>
          </div>
        </div>
      </div>
    </div>
  `
})
export class VoterJourneyComponent implements OnInit {
  selectedState = 'CA';
  data = signal<VoterJourney | null>(null);
  loading = signal(false);

  constructor(private electionService: ElectionService) {}

  ngOnInit() {
    this.loadJourney();
  }

  loadJourney() {
    this.loading.set(true);
    this.electionService.getVoterJourney(this.selectedState).subscribe({
      next: (res) => {
        this.data.set(res);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }
}
