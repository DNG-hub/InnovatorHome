using Microsoft.AspNetCore.Mvc;
using InnovatorHome.Services;
using InnovatorHome.Models;
using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Swashbuckle.AspNetCore.Annotations; // Add this line

namespace InnovatorHome.Controllers.Api
{
    [Route("api/blogposts")]
    [ApiController]
    [SwaggerTag("Blog Post Management")]
    public class BlogPostApiController : ControllerBase
    {
        private readonly IBlogService _blogService;
        private readonly ILogger<BlogPostApiController> _logger;

        public BlogPostApiController(IBlogService blogService, ILogger<BlogPostApiController> logger)
        {
            _blogService = blogService;
            _logger = logger;
        }

        [HttpPost]
        [SwaggerResponse(201, "Blog post created successfully", typeof(BlogPost))]
        [SwaggerResponse(400, "Invalid input")]
        [SwaggerResponse(500, "Internal server error")]
        public async Task<IActionResult> CreateBlogPost([FromBody] BlogPostInputDto input)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                _logger.LogInformation("Creating blog post: {@BlogPostInput}", input);

                var blogPost = new BlogPost
                {
                    Title = input.Title,
                    Content = input.Content,
                    ImageUrl = input.ImageUrl,
                    CategoryId = input.CategoryId,
                    Author = input.Author,
                    Tags = input.Tags,
                    PublishedDate = DateTime.UtcNow
                };

                _logger.LogInformation("Calling BlogService.CreatePostAsync");
                var createdPost = await _blogService.CreatePostAsync(blogPost);
                _logger.LogInformation("Blog post created successfully: {@CreatedPost}", createdPost);

                return CreatedAtAction(nameof(GetBlogPost), new { id = createdPost.Id }, createdPost);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while creating the blog post: {@BlogPostInput}", input);
                return StatusCode(500, "An error occurred while creating the blog post. Please check the server logs for more details.");
            }
        }

        [HttpGet("{id}")]
        [SwaggerResponse(200, "Returns the requested blog post", typeof(BlogPost))]
        [SwaggerResponse(404, "Blog post not found")]
        public async Task<IActionResult> GetBlogPost(int id)
        {
            var post = await _blogService.GetPostByIdAsync(id);
            if (post == null)
            {
                return NotFound();
            }
            return Ok(post);
        }

        // Keep the existing test endpoints
        [HttpGet("test")]
        [SwaggerResponse(200, "Controller is working", typeof(string))]
        public IActionResult TestEndpoint()
        {
            return Ok("BlogPostApiController is working!");
        }

        [HttpGet("error")]
        [SwaggerResponse(500, "Test exception thrown")]
        public IActionResult ErrorTest()
        {
            throw new Exception("This is a test exception");
        }
    }
}
