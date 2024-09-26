using Microsoft.AspNetCore.Mvc;
using InnovatorHome.Services;
using InnovatorHome.Models;
using System.Threading.Tasks;

namespace InnovatorHome.Controllers.Blog
{
    [ApiController]
    [Route("api/blog")]
    public class BlogViewController : ControllerBase
    {
        private readonly IBlogService _blogService;

        public BlogViewController(IBlogService blogService)
        {
            _blogService = blogService;
        }

        [HttpGet]
        public async Task<IActionResult> GetRecentPosts()
        {
            var posts = await _blogService.GetRecentPostsAsync();
            return Ok(posts);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPost(int id)
        {
            var post = await _blogService.GetPostByIdAsync(id);
            if (post == null)
            {
                return NotFound();
            }
            return Ok(post);
        }

        [HttpGet("category/{categoryId}")]
        public async Task<IActionResult> GetPostsByCategory(int categoryId)
        {
            var posts = await _blogService.GetPostsByCategoryAsync(categoryId);
            return Ok(posts);
        }

        [HttpPost]
        public async Task<IActionResult> CreatePost([FromBody] BlogPost post)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var createdPost = await _blogService.CreatePostAsync(post);
            return CreatedAtAction(nameof(GetPost), new { id = createdPost.Id }, createdPost);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePost(int id, [FromBody] BlogPost post)
        {
            if (id != post.Id)
            {
                return BadRequest();
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            await _blogService.UpdatePostAsync(post);

            // Fetch the updated post to return
            var updatedPost = await _blogService.GetPostByIdAsync(id);
            if (updatedPost == null)
            {
                return NotFound();
            }
            return Ok(updatedPost);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePost(int id)
        {
            await _blogService.DeletePostAsync(id);
            return NoContent();
        }

        [HttpGet("categories")]
        public async Task<IActionResult> GetCategories()
        {
            var categories = await _blogService.GetCategoriesAsync();
            return Ok(categories);
        }
    }
}