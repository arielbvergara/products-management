using Microsoft.Extensions.DependencyInjection;
using products.core.Features.Products;

namespace products.core;

public static class Module
{
    public static IServiceCollection AddCoreServices(this IServiceCollection services)
    {
        services.AddScoped<ProductsLogic>();
        return services;
    }
}