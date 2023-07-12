using products.core.Constants;

namespace products.api.Authentication;

public class ApiKeyMiddleware : IMiddleware
{
    private readonly string _expectedApiKey;

    public ApiKeyMiddleware(string expectedApiKey)
    {
        _expectedApiKey = expectedApiKey;
    }

    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        if (context.Request.Method == "OPTIONS")
        {
            await next(context);
            return;
        }

        var apiKey = context.Request.Headers[ConfigurationConstants.ApiKeyHeader].ToString();

        if (apiKey != _expectedApiKey)
        {
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            return;
        }

        await next(context);
    }
}