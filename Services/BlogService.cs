using InnovatorHome.Data;
using InnovatorHome.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InnovatorHome.Services
{
    /// <summary>
    /// Provides services for managing blog-related operations.
    /// </summary>
    public class BlogService : IBlogService
    {
        private readonly IBlogDbContext _context;

        /// <summary>
        /// Initializes a new instance of the <see cref="BlogService"/> class.
        /// </summary>
        /// <param name="context">The database context for blog operations.</param>
        public BlogService(IBlogDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Retrieves all categories asynchronously.
        /// </summary>
        /// <returns>A list of all blog categories.</returns>
        public async Task<List<Category>> GetCategoriesAsync()
        {
            return await _context.Categories.ToListAsync();
        }

        public async Task<List<BlogPost>> GetRecentPostsAsync(int count)
        {
            return await _context.BlogPosts
                .OrderByDescending(p => p.PublishedDate)
                .Take(count)
                .ToListAsync();
        }

        public async Task<BlogPost?> GetPostByIdAsync(int id)
        {
            return await _context.BlogPosts
                .Include(p => p.Category)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<List<BlogPost>> GetPostsByCategoryAsync(int categoryId)
        {
            return await _context.BlogPosts
                .Where(p => p.CategoryId == categoryId)
                .OrderByDescending(p => p.PublishedDate)
                .ToListAsync();
        }

        public async Task<BlogPost> CreatePostAsync(BlogPost post)
        {
            _context.BlogPosts.Add(post); // Use DbSet<BlogPost>.Add method
            await _context.SaveChangesAsync();
            return post;
        }

        public async Task UpdatePostAsync(BlogPost post)
        {
            _context.BlogPosts.Update(post); // Use DbSet<BlogPost>.Update method
            await _context.SaveChangesAsync();
        }

        public async Task DeletePostAsync(int id)
        {
            var post = await _context.BlogPosts.FindAsync(id); // Use DbSet<BlogPost>.FindAsync method
            if (post != null)
            {
                _context.BlogPosts.Remove(post); // Use DbSet<BlogPost>.Remove method
                await _context.SaveChangesAsync();
            }
        }
    }
}