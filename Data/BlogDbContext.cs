using Microsoft.EntityFrameworkCore;
using InnovatorHome.Models;

namespace InnovatorHome.Data
{
    public class BlogDbContext : DbContext
    {
        public BlogDbContext(DbContextOptions<BlogDbContext> options) : base(options) { }

        public DbSet<BlogPost> BlogPosts { get; set; }
        public DbSet<Category> Categories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Seed data
            modelBuilder.Entity<Category>().HasData(
                new Category { Id = 1, Name = "Technology" },
                new Category { Id = 2, Name = "AI" },
                new Category { Id = 3, Name = "Innovation" }
            );

            modelBuilder.Entity<BlogPost>().HasData(
                new BlogPost
                {
                    Id = 1,
                    Title = "The Future of AI",
                    Content = "AI is rapidly evolving and shaping our future...",
                    PublishedDate = DateTime.UtcNow.AddDays(-5),
                    CategoryId = 2
                },
                new BlogPost
                {
                    Id = 2,
                    Title = "Innovation in Tech",
                    Content = "The tech industry is constantly innovating...",
                    PublishedDate = DateTime.UtcNow.AddDays(-2),
                    CategoryId = 1
                }
            );
        }
    }
}