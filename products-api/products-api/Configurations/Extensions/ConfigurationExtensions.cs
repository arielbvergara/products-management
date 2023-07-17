using products.core.Constants;

namespace products.api.Configurations.Extensions;

public static class ConfigurationExtensions
{
    public static string GetOrThrow(this IConfiguration configuration, string key)
    {
        var value = configuration[key];
        if (value == null)
        {
            throw new InvalidOperationException($"Failed to find configuration for '{key}'.");
        }

        return value;
    }
}