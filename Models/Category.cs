using System.Collections.Generic;

namespace InnovatorHome.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public List<BlogPost>? BlogPosts { get; set; }
    }
}