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
        var product = await _productsRepository.AddAsync(productModel.ToProduct());

        return product.ToProductModel();
    }

    public async Task<ProductModel> UpdateProduct(string code, ProductModel productModel)
    {
        var productToUpdateOption = await _productsRepository.GetByCode(code);

        var productToUpdate = productToUpdateOption.Match(
            some: product => product,
            none: () => throw new InvalidOperationException("Product does not exits."));

        productToUpdate.Map(productModel);

        var result = await _productsRepository.UpdateAsync(productToUpdate);

        return result.ToProductModel();
    }

    public async Task DeleteProduct(string code)
    {
        var productToUpdateOption = await _productsRepository.GetByCode(code);

        await productToUpdateOption.Match(
            some: async product => await _productsRepository.DeleteAsync(product),
            none: () => throw new InvalidOperationException("Product does not exits."));
    }
}