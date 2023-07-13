using Core.Tests.ObjectBuilders;
using FluentAssertions;
using products.core.Mappers;
using products.models;

namespace Core.Tests.Mappers;

public class ProductMapperTest
{
    [Fact]
    public void ProductMapper_ToProductModel()
    {
        var sut = ProductBuilder.New().Build();
        var mappedProduct = sut.ToProductModel();

        mappedProduct.Brand.Should().Be(sut.Brand);
        mappedProduct.ProductName.Should().Be(sut.Name);
        mappedProduct.Code.Should().Be(sut.Code);
        mappedProduct.Currency.Should().Be(sut.Currency);
        mappedProduct.Price.Should().Be(sut.Price);
    }

    [Fact]
    public void ProductMapper_Map()
    {
        var sut = ProductBuilder.New().Build();
        var productModel = new ProductModel("Code new", "Product name new", "Brand new", 1000, "EUR new", DateTime.Today.AddDays(-1), DateTime.Today.AddDays(-1));
        sut.Map(productModel);

        sut.Brand.Should().Be(productModel.Brand);
        sut.Name.Should().Be(productModel.ProductName);
        sut.Currency.Should().Be(productModel.Currency);
        sut.Price.Should().Be(productModel.Price);
        
        sut.UpdatedDate.Should().NotBe(productModel.UpdatedDate);
        sut.CreatedDate.Should().NotBe(productModel.CreatedDate);
        sut.Code.Should().NotBe(productModel.Code);
    }
}