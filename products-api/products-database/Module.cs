using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using products.database.Repositories;
using products.database.Repositories.Interfaces;

namespace products.database;

public static class Module
{
    public static IServiceCollection AddDataAccessServices(this IServiceCollection services, string connectionString)
    {
        services.AddDbContext<ProductsContext>(options =>
            options.UseSqlServer(connectionString));

        services.AddTransient<IProductRepository, ProductRepository>();

        return services;
    }
}
