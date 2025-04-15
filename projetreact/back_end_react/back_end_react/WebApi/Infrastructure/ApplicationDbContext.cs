using back_end_react.WebApi.Repository;
using Microsoft.EntityFrameworkCore;

namespace back_end_react.WebApi.Infrastructure;

public class ApplicationDbContext : DbContext
{
  public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
    : base(options) { }

  public DbSet<User> Users { get; set; }
}