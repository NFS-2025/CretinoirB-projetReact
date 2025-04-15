using back_end_react.WebApi.Form;
using back_end_react.WebApi.Repository;

namespace back_end_react.WebApi.IRepository;


using back_end_react.WebApi.Repository;


public interface IUserRepository
{
  Task<User> CreateUserAsync(User user);
  Task<User> GetUserByEmailAsync(string email);
}

