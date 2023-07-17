using products.core.Constants;

namespace products.api.Configurations.Extensions;

public static class ApplicationSettingsExtensions
{
    public static void AddApplicationInsights(this WebApplicationBuilder builder)
    {
        builder.Services.AddApplicationInsightsTelemetry(builder.Configuration[ConfigurationConstants.ApplicationInsightsConnectionString]);
    }
}