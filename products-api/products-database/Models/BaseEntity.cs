namespace products.database.Models;

/// <summary>
/// An abstract entity which has a <see cref="System.Int32"/> identifier type.
/// </summary>
public abstract class BaseEntity 
{
    public int Id { get; set; }
}