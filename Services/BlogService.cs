using InnovatorHome.Data;
using InnovatorHome.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InnovatorHome.Services
{
    public class BlogService : IBlogService
    {
        private readonly BlogDbContext _context;

        public BlogService(BlogDbContext context)
        {
            _context = context;
        }

        public async Task<List<Category>> GetCategoriesAsync()
        {
            return await _context.Categories.ToListAsync();
        }

        public async Task<List<BlogPost>> GetRecentPostsAsync(int count = 5)
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
            _context.BlogPosts.Add(post);
            await _context.SaveChangesAsync();
            return post;
        }

        public async Task UpdatePostAsync(BlogPost post)
        {
            _context.Entry(post).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeletePostAsync(int id)
        {
            var post = await _context.BlogPosts.FindAsync(id);
            if (post != null)
            {
                _context.BlogPosts.Remove(post);
                await _context.SaveChangesAsync();
            }
        }
    }
}