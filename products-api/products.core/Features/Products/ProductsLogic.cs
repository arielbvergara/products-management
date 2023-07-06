using products.core.Mappers;
using products.database.Repositories.Interfaces;
using products.models;

namespace products.core.Features.Products;

public class ProductsLogic
{
    private readonly IProductRepository _productsRepository;

    public ProductsLogic(IProductRepository productsRepository)
    {
        _productsRepository = productsRepository;
    }

    public async Task<ICollection<ProductModel>> GetAllProducts()
    {
        var products = await _productsRepository.GetAllAsync();
        return products.ToProductModel();
    }

    public async Task<ProductModel> GetByCode(string code)
    {
        var productOption = await _productsRepository.GetByCode(code);

        return productOption.Match(
            some: product => product.ToProductModel(), 
            none: () => throw new InvalidOperationException("Product does not exits."));
    }

    public async Task<ProductModel> AddProduct(ProductModel productModel)
    {
        throw new NotImplementedException();
    }

    public async Task<ProductModel> UpdateProduct(string code, ProductModel productModel)
    {
        throw new NotImplementedException();
    }
}