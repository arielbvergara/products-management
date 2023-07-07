using products.database.Models;
using products.models;

namespace products.core.Mappers;

internal static class ProductModelMapper
{
    internal static Product ToProduct(this ProductModel productModel) =>
        new()
        {
            Name = productModel.ProductName,
            Brand = productModel.Brand,
            Code = productModel.Code,
            Currency = productModel.Currency,
            Price = productModel.Price,
            CreatedDate = DateTime.Now
        };
}