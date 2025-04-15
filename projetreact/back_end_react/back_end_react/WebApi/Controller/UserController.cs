using back_end_react.WebApi.Form;
using back_end_react.WebApi.IService;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class UserController : ControllerBase
{
  private readonly IUserService _userService;

  public UserController(IUserService userService)
  {
    _userService = userService;
  }
  [HttpPost("register")]
  public async Task<IActionResult> Register([FromBody] UserForm userForm)
  {
    try
    {
      var userLight = await _userService.RegisterAsync(userForm);
      return Ok(new { Message = "Utilisateur créé avec succès !", User = userLight });
    }
    catch (Exception ex)
    {
      return BadRequest(new { Message = ex.Message });
    }
  }
}