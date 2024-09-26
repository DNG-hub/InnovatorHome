using Microsoft.EntityFrameworkCore;
using InnovatorHome.Models;
using System.Threading;
using System.Threading.Tasks;

namespace InnovatorHome.Data
{
    public interface IBlogDbContext
    {
        DbSet<BlogPost> BlogPosts { get; }
        DbSet<Category> Categories { get; }
        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
    }
}
