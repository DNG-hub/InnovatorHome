using Microsoft.EntityFrameworkCore;
using InnovatorHome.Models;

namespace InnovatorHome.Data
{
    public class BlogDbContext : DbContext, IBlogDbContext
    {
        public BlogDbContext(DbContextOptions<BlogDbContext> options) : base(options) { }

        public DbSet<BlogPost> BlogPosts { get; set; }
        public DbSet<Category> Categories { get; set; }

        public void Update<TEntity>(TEntity entity) where TEntity : class
        {
            base.Update(entity);
        }

        public async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            return await base.SaveChangesAsync(cancellationToken);
        }
    }
}