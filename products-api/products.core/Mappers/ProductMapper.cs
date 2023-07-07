using products.database.Models;
using products.models;

namespace products.core.Mappers;

internal static class ProductMapper
{
    internal static ProductModel ToProductModel(this Product product)
        => new(product.Code, 
            product.Name, 
            product.Brand, 
            product.Price, 
            product.Currency,
            product.CreatedDate,
            product.UpdatedDate);

    internal static ICollection<ProductModel> ToProductModel(this ICollection<Product> products)
        => products.Select(ToProductModel).ToList();

    internal static Product Map(this Product product, ProductModel productModel)
    {
        product.Price = productModel.Price;
        product.Currency = productModel.Currency;
        product.Brand = productModel.Brand;
        product.Name = productModel.ProductName;
        product.UpdatedDate = DateTime.Now;
        
        return product;
    }
}