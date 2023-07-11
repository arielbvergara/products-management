using Microsoft.EntityFrameworkCore;
using products.database.Repositories.Interfaces;

namespace products.database.Repositories;

public abstract class Repository<T> : IRepository<T> where T : class
{
    private readonly ProductsContext _context;

    protected DbSet<T> DbSet { get; set; }

    protected Repository(ProductsContext context)
    {
        _context = context;
        DbSet = _context.Set<T>();
    }

    internal IQueryable<T> All() => DbSet.AsQueryable();
    
    public async Task<ICollection<T>> GetAllAsync()
    {
        return await All().ToListAsync();
    }
    
    public async Task<T> AddAsync(T entity, bool save = true)
    {
        if (entity == null)
        {
            throw new ArgumentNullException($"{nameof(AddAsync)} entity must not be null");
        }

        try
        {
            _context.Add(entity);
            if (save)
            {
                await _context.SaveChangesAsync();
            }

            return entity;
        }
        catch (Exception ex)
        {
            throw new Exception($"{nameof(entity)} could not be saved: {ex.Message}");
        }
    }

    public async Task<T> UpdateAsync(T entity, bool save = true)
    {
        if (entity == null)
        {
            throw new ArgumentNullException($"{nameof(UpdateAsync)} entity must not be null");
        }

        try
        {
            _context.Update(entity);
            if (save)
            {
                await _context.SaveChangesAsync();
            }

            return entity;
        }
        catch (Exception ex)
        {
            throw new Exception($"{nameof(entity)} could not be updated: {ex.Message}");
        }
    }

    public async Task DeleteAsync(T entity)
    {
        if (entity == null)
        {
            throw new ArgumentNullException("entity");
        }

        try
        {
            DbSet.Remove(entity);
            await _context.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            throw new Exception($"{nameof(entity)} could not be deleted: {ex.Message}");
        }
    }
}