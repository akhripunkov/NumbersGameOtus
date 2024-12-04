import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface GameResponse {
  numbers: number[];
  correctNumber: number;
}

export enum GameResult {
  Win = 1,
  Lose = 0
}

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private apiUrl = 'https://localhost:7247/api/game';

  constructor(private http: HttpClient) {}

  startGame(): Observable<GameResponse> {
    return this.http.get<GameResponse>(`${this.apiUrl}/start`);
  }

  playGame(guessedNumber: number, correctNumber: number): Observable<GameResult> {
    const playRequest = {
      guessedNumber,
      correctNumber
    };
    return this.http.post<GameResult>(`${this.apiUrl}/play`, playRequest);
  }
}
