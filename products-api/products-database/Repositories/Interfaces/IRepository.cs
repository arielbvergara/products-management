namespace products.database.Repositories.Interfaces;

public interface IRepository<T> where T : class
{
    Task<ICollection<T>> GetAllAsync();
    Task<T> AddAsync(T entity, bool save = true);
    Task<T> UpdateAsync(T entity, bool save = true);
    Task DeleteAsync(T entity);
}