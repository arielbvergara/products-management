using products.database.Models;
using products.database.Repositories.Interfaces;

namespace products.database.Repositories;

public class ProductRepository : Repository<Product>, IProductRepository
{
    public ProductRepository(ProductsContext context) : base(context)
    {
    }
}