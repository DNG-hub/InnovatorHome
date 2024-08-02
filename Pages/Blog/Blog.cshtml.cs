using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using InnovatorHome.Models;
using InnovatorHome.Services;
using Microsoft.Extensions.Logging;

namespace InnovatorHome.Pages.Blog
{
    public class BlogModel : PageModel
    {
        private readonly IBlogService _blogService;
        private readonly ILogger<BlogModel> _logger;

        public BlogModel(IBlogService blogService, ILogger<BlogModel> logger)
        {
            _blogService = blogService;
            _logger = logger;
        }

        public List<Category> Categories { get; set; } = new List<Category>();
        public List<BlogPost> RecentPosts { get; set; } = new List<BlogPost>();
        public BlogPost? CurrentPost { get; set; }

        public async Task<IActionResult> OnGetAsync(int? postId)
        {
            try
            {
                Categories = await _blogService.GetCategoriesAsync();
                RecentPosts = await _blogService.GetRecentPostsAsync(10); // Fetching 10 most recent posts

                if (postId.HasValue)
                {
                    CurrentPost = await _blogService.GetPostByIdAsync(postId.Value);
                }
                else
                {
                    CurrentPost = RecentPosts.FirstOrDefault();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to fetch blog data from service");
                // Fallback data handling (similar to your existing code)
            }

            return Page();
        }
    }
}