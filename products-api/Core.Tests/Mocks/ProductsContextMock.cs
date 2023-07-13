using Core.Tests.Extensions;
using Microsoft.EntityFrameworkCore;
using products.database;

namespace Core.Tests.Mocks;

public static class ProductsContextMock
{
    public static ProductsContext GetContext(string? namedInstance = null)
    {
        var options = new DbContextOptionsBuilder<ProductsContext>()
            .SetupInMemoryTestDatabase(namedInstance ?? Guid.NewGuid().ToString())
            .Options;

        return new ProductsContext(options);
    }
}