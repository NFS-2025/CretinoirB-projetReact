using back_end_react.WebApi.Infrastructure;
using back_end_react.WebApi.IRepository;
using back_end_react.WebApi.IService;
using back_end_react.WebApi.Repository;
using back_end_react.WebApi.Service;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Ajouter CORS
builder.Services.AddCors(options =>
{
  options.AddPolicy("AllowSpecificOrigin", policy =>
  {
    policy.WithOrigins("http://localhost:5175")
      .AllowAnyHeader()
      .AllowAnyMethod();
  });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IUserRepository, UserRepository>();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
  options.UseMySql(
    "Server=localhost;Database=testdb;User=root;Password=;",
    ServerVersion.AutoDetect("Server=localhost;Database=testdb;User=root;Password=;")
  )
);

var app = builder.Build();
if (app.Environment.IsDevelopment())
{
  app.UseDeveloperExceptionPage();
  app.UseCors("AllowSpecificOrigin");

// Ajouter Swagger UI
  app.UseSwagger();
  app.UseSwaggerUI(options => { options.SwaggerEndpoint("/swagger/v1/swagger.json", "API Backend React v1"); });

  app.UseRouting();

  app.MapControllers();

  app.Run();
}