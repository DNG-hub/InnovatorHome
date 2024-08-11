using Microsoft.AspNetCore.Mvc;
using InnovatorHome.Services;
using InnovatorHome.Models;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using System.IO;

namespace InnovatorHome.Controllers.Api
{
    [Route("api/blogposts")]
    [ApiController]
    [Authorize] // Ensure this endpoint is secured
    public class BlogPostApiController : ControllerBase
    {
        private readonly IBlogService _blogService;

        public BlogPostApiController(IBlogService blogService)
        {
            _blogService = blogService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateBlogPost([FromForm] BlogPost blogPost, IFormFile image)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (image != null)
            {
                // Save the image file to a specific path
                var filePath = Path.Combine("wwwroot/images", image.FileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await image.CopyToAsync(stream);
                }

                // Assuming BlogPost has a property to store the image path
                blogPost.ImagePath = $"/images/{image.FileName}";
            }

            var createdPost = await _blogService.CreatePostAsync(blogPost);
            return CreatedAtAction(nameof(GetBlogPost), new { id = createdPost.Id }, createdPost);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBlogPost(int id)
        {
            var post = await _blogService.GetPostByIdAsync(id);
            if (post == null)
            {
                return NotFound();
            }
            return Ok(post);
        }
    }
}
