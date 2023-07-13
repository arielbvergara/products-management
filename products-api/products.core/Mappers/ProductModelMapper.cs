using products.database.Models;
using products.models;

namespace products.core.Mappers;

public static class ProductModelMapper
{
    public static Product ToProduct(this ProductModel productModel) =>
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