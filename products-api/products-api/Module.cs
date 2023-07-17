using products.api.Authentication;
using products.core;
using products.database;
using products.core.Constants;
using products.api.Configurations.Extensions;

namespace products.api;

public static class Module
{
    public static void AddApiServices(this WebApplicationBuilder builder)
    {
        var connectionString = builder.Configuration.GetOrThrow(ConfigurationConstants.DatabaseConnectionString);
        var apiKey = builder.Configuration.GetOrThrow(ConfigurationConstants.ProductsApiKey);

        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();
        builder.Services.AddScoped<ApiKeyMiddleware>(_ => new(apiKey));

        builder.Services
            .AddCoreServices()
            .AddDataAccessServices(connectionString);

        builder.Services.AddCors();
    }
}