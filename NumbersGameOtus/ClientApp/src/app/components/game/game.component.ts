import { Component, OnInit } from '@angular/core';
import { GameService, GameResult } from '../../services/game.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  numbers: number[] = [];
  correctNumber: number = 0;
  message: string = '';
  guessedNumber: number | null = null;
  selectedNumber: number | null = null;
  colors: { [key: number]: string } = {}; // Для отслеживания цвета кнопки

  constructor(private gameService: GameService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.startGame();
  }

  startGame(): void {
    this.gameService.startGame().subscribe(response => {
      this.numbers = response.numbers;
      this.correctNumber = response.correctNumber;
      this.message = '';
      this.guessedNumber = null;
      this.selectedNumber = null;
      this.colors = {}; // сброс цветов
    });
  }

  // Метод для обработки клика по числу
  onNumberClick(number: number): void {
    this.selectedNumber = number;
    this.colors = {}; // сброс всех цветов
    this.colors[number] = 'selected'; // для выбранной кнопки

    this.playGame(number);
  }

  playGame(number: number): void {
    if (number === null) {
      this.message = 'Пожалуйста, выберите число!';
      return;
    }

    // Отправляем выбранное число на бекенд для проверки
    this.gameService.playGame(number, this.correctNumber).subscribe(result => {
      if (result === GameResult.Win) {
        this.message = 'Поздравляем, вы угадали правильно!';
        this.snackBar.open('Поздравляем, вы угадали правильно!', 'Закрыть', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
        this.colors[number] = 'green'; // зеленый цвет для правильного ответа
      } else {
        this.message = 'Упс! Неверный выбор, попробуйте снова!';
        this.snackBar.open('Упс! Неверный выбор, попробуйте снова!', 'Закрыть', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
        this.colors[number] = 'red'; // красный цвет для неправильного ответа
      }
    });
  }
}
