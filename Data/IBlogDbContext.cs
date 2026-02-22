using Microsoft.EntityFrameworkCore;
using InnovatorHome.Models;
using System.Threading;
using System.Threading.Tasks;

namespace InnovatorHome.Data
{
    public interface IBlogDbContext
    {
        DbSet<BlogPost> BlogPosts { get; set; }
        DbSet<Category> Categories { get; set; }
        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
    }

}
