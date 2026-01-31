using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// --------------------
// Services
// --------------------

builder.Services.AddControllers();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=notes.db"));

builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<INoteService, NoteService>();
builder.Services.AddScoped<TextAnalysisService>();
builder.Services.AddScoped<JwtTokenGenerator>();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer("Bearer", options =>
    {
        options.TokenValidationParameters = new()
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!))
        };
    });

builder.Services.AddAuthorization();

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApi();

// --------------------
// App
// --------------------

builder.Services.AddCors(options => { options.AddPolicy("AllowLocalhost", policy => policy.WithOrigins("http://localhost:5173") .AllowAnyHeader() .AllowAnyMethod());});
var app = builder.Build();

app.UseCors("AllowLocalhost");

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.MapGet("/", () => "Smart Notes API running 🚀");

app.Run();