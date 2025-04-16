var builder = WebApplication.CreateBuilder(args);

// Ajouter CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin", policy =>
    {
        // Ajouter les deux URLs de ton front-end
        policy.WithOrigins("https://exemplary-nourishment-frontreact-dafe.up.railway.app", "https://exemplary-nourishment-frontreact.up.railway.app")
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

// Appliquer CORS pour tous les environnements
app.UseCors("AllowSpecificOrigin");

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();

    // Ajouter Swagger UI
    app.UseSwagger();
    app.UseSwaggerUI(options => { options.SwaggerEndpoint("/swagger/v1/swagger.json", "API Backend React v1"); });
}

app.UseRouting();
app.MapControllers();

app.Run();
