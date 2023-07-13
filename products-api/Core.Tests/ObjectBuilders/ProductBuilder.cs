using products.database.Models;

namespace Core.Tests.ObjectBuilders;

public class ProductBuilder
{
	private readonly Product _product;

	private ProductBuilder()
	{
		_product = new Product()
		{
			Brand = "brand",
			Code = "code",
			Name = "name",
			Price = 100,
			Currency = "EUR"
        };
	}

	public static ProductBuilder New() => new();

	public Product Build() => _product;

    public ProductBuilder WithCode(string code)
    {
		_product.Code = code;
		return this;
    }
}