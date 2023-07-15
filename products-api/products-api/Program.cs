using Microsoft.AspNetCore.Diagnostics;
using products.api;
using products.api.Authentication;
using products.core.Constants;

var builder = WebApplication.CreateBuilder(args);
builder.AddApiServices();

var webClientUrl = builder.Configuration[ConfigurationConstants.WebClientUrl];
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
            .WithHeaders(ConfigurationConstants.ApiKeyHeader, "Content-Type", "Accept")
            .AllowAnyMethod();
    }
});

app.UseExceptionHandler(c => c.Run(async context =>
{
    var exception = context.Features
        .Get<IExceptionHandlerPathFeature>()
        .Error;
    var response = new { error = exception.Message };
    await context.Response.WriteAsJsonAsync(response);
}));

app.UseAuthorization();

app.MapControllers();

app.Run();
