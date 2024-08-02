using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Collections.Generic;
using InnovatorHome.Models;

namespace InnovatorHome.Pages.Shared
{
    public class BlogSidebarModel : PageModel
    {
        public List<Category> Categories { get; set; } = new List<Category>();
        public List<BlogPost> RecentPosts { get; set; } = new List<BlogPost>();

        public void OnGet()
        {
            // This method will be called when the partial view is rendered
            // You can add any initialization logic here if needed
        }
    }
}