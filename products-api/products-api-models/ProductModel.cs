namespace products.models;

public record ProductModel(string Code, string ProductName, string Brand, double Price, string Currency, DateTime CreatedDate = default, DateTime UpdatedDate = default);