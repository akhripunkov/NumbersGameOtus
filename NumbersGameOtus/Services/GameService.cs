using NumbersGameOtus.Models;

namespace NumbersGameOtus.Services;

public class GameService : IGameService
{
    private readonly Random _random = new();

    public GameResponse StartGame()
    {
        var correctNumber = _random.Next(1, 101);
        var numbers = new HashSet<int> { correctNumber };

        while (numbers.Count < 4)
        {
            numbers.Add(_random.Next(1, 101)); 
        }

        var shuffledNumbers = new List<int>(numbers);
        shuffledNumbers.Sort();  

        return new GameResponse
        {
            Numbers = shuffledNumbers,
            CorrectNumber = correctNumber
        };
    }

    public GameResult PlayGame(int guessedNumber, int correctNumber)
    {
        if (guessedNumber == correctNumber)
        {
            return GameResult.Win;
        }
        else
        {
            return GameResult.Lose;
        }
    }
}