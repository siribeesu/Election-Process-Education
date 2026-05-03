import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface VoterJourney {
  state: string;
  nextElectionDate: string;
  steps: {
    id: number;
    title: string;
    description: string;
    deadline: string | null;
    status: string;
    link: string;
    linkText: string;
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class ElectionService {
  private apiUrl = '/api/election';

  constructor(private http: HttpClient) {}

  getVoterJourney(state: string): Observable<VoterJourney> {
    return this.http.get<VoterJourney>(`${this.apiUrl}/voter-journey?state=${state}`);
  }

  getStats(): Observable<any> {
    return this.http.get(`${this.apiUrl}/stats`);
  }

  getMyths(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/myths`);
  }
}
