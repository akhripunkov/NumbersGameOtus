using NumbersGameOtus.Models;

namespace NumbersGameOtus.Services;

public interface IGameService
{
    GameResponse StartGame();
    GameResult PlayGame(int guessedNumber, int correctNumber);
}