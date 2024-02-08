using Microsoft.EntityFrameworkCore;
using mini_crm.Context;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<MyDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// Конфигурация HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(builder =>
{
    builder.AllowAnyOrigin()  // Allow requests from any origin
        .AllowAnyHeader()
        .AllowAnyMethod();
    // Do not use .AllowCredentials() when using AllowAnyOrigin()
});

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();