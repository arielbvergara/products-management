using Core.Tests.Mocks;
using Core.Tests.ObjectBuilders;
using FluentAssertions;
using Optional;
using Optional.Unsafe;
using products.core.Exceptions;
using products.core.Features.Products;
using products.database.Models;
using products.database.Repositories;
using products.database.Repositories.Interfaces;
using products.models;

namespace Core.Tests.Features.Products;

public class ProductLogicTest
{
    private const string Code = "Bike1234";
    private readonly ProductModel _defaultProduct = new("Random code", "new product name", "new brand", 100000, "USD");
    private readonly IProductRepository _productRepository;
    private readonly ProductsLogic _sut;

    public ProductLogicTest()
    {
        var context = ProductsContextMock.GetContext();
        _productRepository = new ProductRepository(context);
        _sut = new ProductsLogic(_productRepository);
    }

    [Fact]
    public async Task GetAllProducts_ShouldReturnEmptyList_WhenThereAreNoProductsInTheDB()
    {
        var result = await _sut.GetAllProducts();
        result.Should().HaveCount(0);
    }

    [Fact]
    public async Task GetAllProducts_ShouldReturn3Products_WhenThereAre3ProductsInTheDB()
    {
        await BuildProductAndSaveInDatabase();
        await BuildProductAndSaveInDatabase();
        await BuildProductAndSaveInDatabase();

        var result = await _sut.GetAllProducts();

        result.Should().HaveCount(3);
    }

    [Fact]
    public async Task GetByCode_ShouldReturnAProduct_WhenThereIsAProductWithThatCode()
    {
        var product = await BuildProductAndSaveInDatabase(Code);

        var result = await _sut.GetByCode(Code);

        result.Should().NotBeNull();
        result.Code.Should().Be(Code);
        result.Brand.Should().Be(product.Brand);
        result.ProductName.Should().Be(product.Name);
        result.Currency.Should().Be(product.Currency);
        result.Price.Should().Be(product.Price);
    }

    [Fact]
    public async Task GetByCode_ShouldThrowException_WhenThereIsNotAProductWithThatCode()
    {
        await _sut.Invoking(sut => sut.GetByCode(Code))
            .Should()
            .ThrowAsync<InvalidOperationException>()
            .WithMessage($"Product with code '{Code}' does not exits.");
    }

    [Fact]
    public async Task AddProduct_ShouldAddTheProductToTheDB_WhenItDoesNotExists()
    {
        var product = new ProductModel(Code, "productName", "brand", 123, "EUR");

        await _sut.AddProduct(product);

        var result = (await _productRepository.GetByCode(Code)).ValueOrFailure();

        result.Code.Should().Be(Code);
        result.Brand.Should().Be(product.Brand);
        result.Name.Should().Be(product.ProductName);
        result.Currency.Should().Be(product.Currency);
        result.Price.Should().Be(product.Price);
    }

    [Fact]
    public async Task AddProduct_ShouldNotAddTheProductToTheDB_WhenItAlreadyExists()
    {
        await BuildProductAndSaveInDatabase(Code);
       
        var product = new ProductModel(Code, "productName", "brand", 123, "EUR");

        await _sut.Invoking(sut => sut.AddProduct(product))
            .Should()
            .ThrowAsync<ExistingEntityException>()
            .WithMessage($"Product with code '{Code}' already exists.");
    }

    [Fact]
    public async Task UpdateProduct_ShouldEditTheProductToTheDB_WhenItExists()
    {
        await BuildProductAndSaveInDatabase(Code);
        
        await _sut.UpdateProduct(Code, _defaultProduct);

        var result = (await _productRepository.GetByCode(Code)).ValueOrFailure();

        result.Code.Should().Be(Code);
        result.Code.Should().NotBe(_defaultProduct.Code);
        result.Brand.Should().Be(_defaultProduct.Brand);
        result.Name.Should().Be(_defaultProduct.ProductName);
        result.Currency.Should().Be(_defaultProduct.Currency);
        result.Price.Should().Be(_defaultProduct.Price);
    }

    [Fact]
    public async Task UpdateProduct_ShouldThrowException_WhenItDoesNotExists()
    {
        await _sut.Invoking(sut => sut.UpdateProduct(Code , _defaultProduct))
            .Should()
            .ThrowAsync<InvalidOperationException>()
            .WithMessage($"Product with code '{Code}' does not exits.");
    }

    [Fact]
    public async Task DeleteProduct_ShouldDeleteTheProduct_WhenItExists()
    {
        await BuildProductAndSaveInDatabase(Code);

        await _sut.DeleteProduct(Code);

        var result = await _productRepository.GetByCode(Code);

        result.Should().Be(Option.None<Product>());
    }

    [Fact]
    public async Task DeleteProduct_ShouldThrowException_WhenItDoesNotExists()
    {
        await _sut.Invoking(sut => sut.DeleteProduct(Code))
            .Should()
            .ThrowAsync<InvalidOperationException>()
            .WithMessage($"Product with code '{Code}' does not exits.");
    }

    private async Task<Product> BuildProductAndSaveInDatabase(string code = "default code")
    {
        var product = ProductBuilder.New().WithCode(code).Build();
        await _productRepository.AddAsync(product);

        return product;
    }
}