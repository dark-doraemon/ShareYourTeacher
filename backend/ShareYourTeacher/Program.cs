
using ShareYourTeacher.API.SingalR;

namespace ShareYourTeacher;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddSignalR(options => {
            options.MaximumReceiveMessageSize = 1024 * 1024 * 1000;
        });
        builder.Services.AddCors();

        // Add services to the container.
        builder.Services.AddAuthorization();

        // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
        builder.Services.AddOpenApi();

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.MapOpenApi();
        }

        // app.UseHttpsRedirection();

        app.UseAuthorization();

        var summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        app.UseCors(policy =>
            policy.WithOrigins("http://127.0.0.1:5500") // Chỉ định nguồn gốc cụ thể
                    .AllowAnyHeader()  // Cho phép mọi header
                    .AllowAnyMethod()  // Cho phép mọi phương thức HTTP
                    .AllowCredentials()); // Cho phép gửi thông tin xác thực (cookie, v.v.)

        // app.UseCors(policy => policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
        app.MapHub<DrawHub>("hub/presence");
        app.MapGet("/weatherforecast", (HttpContext httpContext) =>
        {
            var forecast = Enumerable.Range(1, 5).Select(index =>
                new WeatherForecast
                {
                    Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                    TemperatureC = Random.Shared.Next(-20, 55),
                    Summary = summaries[Random.Shared.Next(summaries.Length)]
                })
                .ToArray();
            return forecast;
        })
        .WithName("GetWeatherForecast");

        app.Run();
    }
}
