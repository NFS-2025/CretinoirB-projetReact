using back_end_react.WebApi.Form;
using back_end_react.WebApi.IRepository;
using back_end_react.WebApi.IService;
using back_end_react.WebApi.Light;
using back_end_react.WebApi.Repository;

namespace back_end_react.WebApi.Service;

public class UserService : IUserService
{
  private readonly IUserRepository _userRepository;

  public UserService(IUserRepository userRepository)
  {
    _userRepository = userRepository;
  }

  public async Task<UserLight> RegisterAsync(UserForm userForm)
  {
    var existingUser = await _userRepository.GetUserByEmailAsync(userForm.Email);
    if (existingUser != null)
    {
      throw new Exception("Un utilisateur avec cet email existe déjà.");
    }

    var user = new User
    {
      FirstName = userForm.FirstName,
      LastName = userForm.LastName,
      Email = userForm.Email,
      Password = userForm.Password 
    };

    var createdUser = await _userRepository.CreateUserAsync(user);

    return new UserLight
    {
      FirstName = createdUser.FirstName,
      LastName = createdUser.LastName,
      Email = createdUser.Email
    };
  }

  public async Task<UserLight> AuthenticateAsync(LoginModel loginModel)
  {
    var user = await _userRepository.GetUserByEmailAsync(loginModel.Email);
    if (user == null || user.Password != loginModel.Password)
    {
      throw new Exception("Email ou mot de passe incorrect.");
    }

    return new UserLight
    {
      FirstName = user.FirstName,
      LastName = user.LastName,
      Email = user.Email
    };
  }
}