namespace products.database.Models;

public class Product : Entity
{
    public required string Code { get; set; }

    public required string Name { get; set; }

    public required string Brand { get; set; }

    public required double Price { get; set; }

    public required string Currency { get; set; }
}