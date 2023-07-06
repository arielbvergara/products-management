using Microsoft.EntityFrameworkCore;
using Optional;
using products.database.Models;
using products.database.Repositories.Interfaces;

namespace products.database.Repositories;

public class ProductRepository : Repository<Product>, IProductRepository
{
    public ProductRepository(ProductsContext context) : base(context)
    {
    }

    public async Task<Option<Product>> GetByCode(string code)
    {
        var product = await DbSet.FirstOrDefaultAsync(x => x.Code == code);

        if (product == null)
        {
            return Option.None<Product>();
        }

        return Option.Some(product);
    }
}