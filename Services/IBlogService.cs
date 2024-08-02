using InnovatorHome.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace InnovatorHome.Services
{
    public interface IBlogService
    {
        Task<List<Category>> GetCategoriesAsync();
        Task<List<BlogPost>> GetRecentPostsAsync(int count = 5);
        Task<BlogPost?> GetPostByIdAsync(int id);
        Task<List<BlogPost>> GetPostsByCategoryAsync(int categoryId);
        Task<BlogPost> CreatePostAsync(BlogPost post);
        Task UpdatePostAsync(BlogPost post);
        Task DeletePostAsync(int id);
    }
}