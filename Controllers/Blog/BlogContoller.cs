using Microsoft.AspNetCore.Mvc;
using InnovatorHome.Services;
using System.Threading.Tasks;

namespace InnovatorHome.Controllers
{
    public class BlogController : Controller
    {
        private readonly IBlogService _blogService;

        public BlogController(IBlogService blogService)
        {
            _blogService = blogService;
        }

        [HttpGet]
        public async Task<IActionResult> GetPostsByCategory(int categoryId)
        {
            var posts = await _blogService.GetPostsByCategoryAsync(categoryId);
            return Json(posts);
        }

        [HttpGet]
        public async Task<IActionResult> GetPost(int id)
        {
            var post = await _blogService.GetPostByIdAsync(id);
            if (post == null)
            {
                return NotFound();
            }
            return Json(post);
        }
    }
}
