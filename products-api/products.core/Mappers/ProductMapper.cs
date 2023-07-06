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
            product.Currency);

    internal static ICollection<ProductModel> ToProductModel(this ICollection<Product> products)
        => products.Select(ToProductModel).ToList();
}