﻿using Microsoft.EntityFrameworkCore;
using products.database.Models;

namespace products.database;

public class ProductsContext : DbContext
{
    public ProductsContext(DbContextOptions<ProductsContext> options) : base(options)
    {
    }

    /// <summary>
    /// DbSet which holds a collection of <see cref="Product"/> entities.
    /// </summary>
    public DbSet<Product> Products { get; set; }
}