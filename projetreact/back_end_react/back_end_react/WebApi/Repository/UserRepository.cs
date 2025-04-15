using back_end_react.WebApi.Form;
using back_end_react.WebApi.Infrastructure;
using back_end_react.WebApi.IRepository;
using back_end_react.WebApi.Repository;
using Microsoft.EntityFrameworkCore;

using back_end_react.WebApi.Infrastructure;
using back_end_react.WebApi.IRepository;
using back_end_react.WebApi.Repository;
using Microsoft.EntityFrameworkCore;

namespace back_end_react.WebApi.Repository;

public class UserRepository : IUserRepository
{
  private readonly ApplicationDbContext _context;

  public UserRepository(ApplicationDbContext context)
  {
    _context = context;
  }

  public async Task<User> CreateUserAsync(User user)
  {
    _context.Users.Add(user);
    await _context.SaveChangesAsync();
    return user;
  }

  public async Task<User> GetUserByEmailAsync(string email)
  {
    return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
  }
}
