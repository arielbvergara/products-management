using products.database.Models;
using products.models;

namespace products.core.Mappers;

public static class ProductMapper
{
    public static ProductModel ToProductModel(this Product product)
        => new(product.Code, 
            product.Name, 
            product.Brand, 
            product.Price, 
            product.Currency,
            product.CreatedDate,
            product.UpdatedDate);

    public static ICollection<ProductModel> ToProductModel(this ICollection<Product> products)
        => products.Select(ToProductModel).ToList();

    public static void Map(this Product product, ProductModel productModel)
    {
        product.Price = productModel.Price;
        product.Currency = productModel.Currency;
        product.Brand = productModel.Brand;
        product.Name = productModel.ProductName;
        product.UpdatedDate = DateTime.Now;
    }
}