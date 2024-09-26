using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace InnovatorHome.Models
{
    public class BlogPost
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public DateTime PublishedDate { get; set; }

        [Required]
        public int CategoryId { get; set; }

        [Required]
        public string Author { get; set; } = string.Empty;

        public string? Tags { get; set; }

        public string? ImageUrl { get; set; }

        [Required]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Content { get; set; } = string.Empty;

        [ForeignKey("CategoryId")]
        public Category? Category { get; set; }

    }
}