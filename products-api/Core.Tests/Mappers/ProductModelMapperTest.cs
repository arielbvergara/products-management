using FluentAssertions;
using products.core.Mappers;
using products.models;

namespace Core.Tests.Mappers;

public class ProductModelMapperTest
{
    [Fact]
    public void ProductModelMapper()
    {
        var sut = new ProductModel("Code", "Product name", "Brand", 1234, "EUR", DateTime.Today, DateTime.Today);
        var productMapped = sut.ToProduct();

        productMapped.Brand.Should().Be(sut.Brand);
        productMapped.Code.Should().Be(sut.Code);
        productMapped.Name.Should().Be(sut.ProductName);
        productMapped.Currency.Should().Be(sut.Currency);
        productMapped.UpdatedDate.Should().Be(sut.UpdatedDate);
        productMapped.CreatedDate.Should().Be(sut.CreatedDate);
    }
}