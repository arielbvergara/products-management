using Microsoft.AspNetCore.Diagnostics;
using products.api;
using products.api.Authentication;
using products.core.Constants;
using products.api.Configurations.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.AddKeyVault();
builder.AddApplicationInsights();
builder.AddApiServices();

var app = builder.Build();

var webClientUrl = builder.Configuration[ConfigurationConstants.WebClientUrl];

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
            .WithHeaders(ConfigurationConstants.ApiKeyHeader, "Content-Type", "Accept")
            .AllowAnyMethod();
    }
});

app.UseExceptionHandler(c => c.Run(async context =>
{
    var exception = context.Features
        .Get<IExceptionHandlerPathFeature>()
        ?.Error;
    var response = new { error = exception?.Message };
    await context.Response.WriteAsJsonAsync(response);
}));

app.UseAuthorization();

app.MapControllers();

app.Run();
