using System;

namespace InnovatorHome.Models
{
    public class BlogPost
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public string Author { get; set; } = string.Empty;
        public DateTime PublishedDate { get; set; }
        public int CategoryId { get; set; }
        public Category? Category { get; set; }
        public string? Tags { get; set; }
        public string? ImagePath { get; set; }  // Store relative path, e.g., "/images/blog/post-1.jpg"
    }
}