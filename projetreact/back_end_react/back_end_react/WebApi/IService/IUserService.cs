using back_end_react.WebApi.Form;
using back_end_react.WebApi.Light;
using back_end_react.WebApi.Repository;

namespace back_end_react.WebApi.IService;

public interface IUserService
{
  Task<UserLight> RegisterAsync(UserForm userForm);
  Task<UserLight> AuthenticateAsync(LoginModel loginModel);
}

