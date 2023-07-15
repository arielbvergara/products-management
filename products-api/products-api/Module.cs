using Azure.Identity;
using products.api.Authentication;
using products.core.Exceptions;
using products.core;
using products.database;
using products.core.Constants;

namespace products.api;

public static class Module
{
    public static void AddApiServices(this WebApplicationBuilder builder)
    {
        builder.Configuration.AddAzureKeyVault(
            new Uri("https://kv-products-app.vault.azure.net/"),
            new DefaultAzureCredential());

        var connectionString = builder.Configuration[ConfigurationConstants.DatabaseConnectionString];
        var apiKey = builder.Configuration[ConfigurationConstants.ProductsApiKey];

        if (string.IsNullOrEmpty(connectionString))
        {
            throw new MissingApiKeyException("ConnectionString is required to be set in the settings.");
        }

        if (string.IsNullOrEmpty(apiKey))
        {
            throw new MissingApiKeyException("Api key is required to be set in the settings.");
        }

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