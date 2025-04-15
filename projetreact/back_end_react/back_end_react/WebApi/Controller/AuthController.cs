using back_end_react.WebApi.Form;
using back_end_react.WebApi.IService;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
  private readonly IUserService _userService;

  public AuthController(IUserService userService)
  {
    _userService = userService;
  }

  [HttpPost("register")]
  public async Task<IActionResult> Register([FromBody] UserForm userForm)
  {
    try
    {
      var userLight = await _userService.RegisterAsync(userForm);
      return Ok(new { message = "Inscription réussie", user = userLight });
    }
    catch (Exception ex)
    {
      return BadRequest(new { message = ex.Message });
    }
  }

  [HttpPost("login")]
  public async Task<IActionResult> Login([FromBody] LoginModel loginModel)
  {
    try
    {
      var userLight = await _userService.AuthenticateAsync(loginModel);
      return Ok(new { message = "Connexion réussie", user = userLight });
    }
    catch (Exception ex)
    {
      return Unauthorized(new { message = ex.Message });
    }
  }
}