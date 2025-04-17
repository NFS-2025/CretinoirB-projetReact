using back_end_react.WebApi.Form;                 
using back_end_react.WebApi.IService;              
using back_end_react.WebApi.Service;               
using back_end_react.WebApi.Repository;            
using back_end_react.WebApi.IRepository;           
using back_end_react.WebApi.Infrastructure;         
using Microsoft.AspNetCore.Mvc;                    
using Microsoft.EntityFrameworkCore;               
using Pomelo.EntityFrameworkCore.MySql.Infrastructure; 

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAnyOrigin", policy =>
    {
        policy.AllowAnyOrigin()    
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
    "Server=yamanote.proxy.rlwy.net;Port=14007;Database=railway;User=root;Password=mceRKioEryRfNkgejyjFvTajvWIpTlYi;",
    ServerVersion.AutoDetect("Server=yamanote.proxy.rlwy.net;Port=14007;Database=railway;User=root;Password=mceRKioEryRfNkgejyjFvTajvWIpTlYi;")
  )
);

var app = builder.Build();
app.UseCors("AllowAnyOrigin");
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI(options => { options.SwaggerEndpoint("/swagger/v1/swagger.json", "API Backend React v1"); });
}

app.UseRouting();
app.MapControllers();
app.Run();
