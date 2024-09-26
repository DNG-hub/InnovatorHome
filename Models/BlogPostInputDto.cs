using System.ComponentModel.DataAnnotations;

namespace InnovatorHome.Models
{
    public class BlogPostInputDto
    {
        [Required]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Content { get; set; } = string.Empty;

        public string? ImageUrl { get; set; }

        [Required]
        public int CategoryId { get; set; }

        [Required]
        public string Author { get; set; } = string.Empty;

        public string? Tags { get; set; }
    }
}
