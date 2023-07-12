using products.api.Authentication;
using products.core;
using products.core.Constants;
using products.core.Exceptions;
using products.database;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration[ConfigurationConstants.DatabaseConnectionString];
var apiKey = builder.Configuration[ConfigurationConstants.ProductsApiKey];
var webClientUrl = builder.Configuration[ConfigurationConstants.WebClientUrl];

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<ApiKeyMiddleware>(_ =>
{
    if (apiKey == null)
    {
        throw new MissingApiKeyException("Api key is required to be set in the settings.");
    }

    return new(apiKey);
});

builder.Services
    .AddCoreServices()
    .AddDataAccessServices(connectionString);

builder.Services.AddCors();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseMiddleware<ApiKeyMiddleware>();
app.UseCors(corsBuilder =>
{
    if (webClientUrl != null)
    {
        corsBuilder.WithOrigins(webClientUrl)
            .WithHeaders(ConfigurationConstants.ApiKeyHeader)
            .AllowAnyMethod();
    }
});

app.UseAuthorization();

app.MapControllers();

app.Run();
