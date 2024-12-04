using Microsoft.AspNetCore.Mvc;
using NumbersGameOtus.Models;
using NumbersGameOtus.Services;

namespace NumbersGameOtus.Controllers;

[Route("api/[controller]")]
[ApiController]
public class GameController : ControllerBase
{
    private readonly IGameService _gameService;

    public GameController(IGameService gameService)
    {
        _gameService = gameService;
    }

    [HttpGet("start")]
    public ActionResult<GameResponse> StartGame()
    {
        var game = _gameService.StartGame();
        return Ok(game);
    }

    [HttpPost("play")]
    public ActionResult<GameResult> PlayGame([FromBody] PlayGameRequest request)
    {
        var result = _gameService.PlayGame(request.GuessedNumber, request.CorrectNumber);
        return Ok(result);
    }
}
