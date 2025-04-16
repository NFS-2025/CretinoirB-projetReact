var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin", policy =>
    {
        policy.WithOrigins("http://localhost:5175", "https://exemplary-nourishment-frontreact.up.railway.app")
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
app.UseCors("AllowSpecificOrigin");

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI(options => { options.SwaggerEndpoint("/swagger/v1/swagger.json", "API Backend React v1"); });
}

app.UseRouting();
app.MapControllers();

app.Run();
