namespace products.database.Repositories.Interfaces;

public interface IRepository<T> where T : class
{
    Task<IEnumerable<T>> GetAllAsync();
    Task<T> GetByIdAsync(int id);
    Task<T> AddAsync(T entity, bool save = true);
    Task<T> UpdateAsync(T entity, bool save = true);
    Task DeleteAsync(T entity);
    Task SaveChangesAsync();
}