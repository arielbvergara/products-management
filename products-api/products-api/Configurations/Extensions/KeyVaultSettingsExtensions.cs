using Azure.Identity;
using products.core.Constants;

namespace products.api.Configurations.Extensions;

public static class KeyVaultSettingsExtensions
{
    public static void AddKeyVault(this WebApplicationBuilder builder)
    {
        var keyVaultSettings = builder.Configuration[ConfigurationConstants.KeyVaultUri];

        if (keyVaultSettings == null)
        {
            return;
        }

        builder.Configuration.AddAzureKeyVault(
            new Uri(keyVaultSettings),
            new DefaultAzureCredential());
    }
}