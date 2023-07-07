using Optional;
using products.database.Models;

namespace products.database.Repositories.Interfaces;

public interface IProductRepository : IRepository<Product>
{
    Task<Option<Product>> GetByCode(string code);
}