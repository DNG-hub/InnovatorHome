document.addEventListener('DOMContentLoaded', function () {
    const blogContent = document.getElementById('blogContent');
    const categoryLinks = document.querySelectorAll('.category-link');
    const postLinks = document.querySelectorAll('.post-link');

    categoryLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const categoryId = this.getAttribute('data-category-id');
            loadCategoryPosts(categoryId);
        });
    });

    postLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const postId = this.getAttribute('data-post-id');
            loadBlogPost(postId);
        });
    });

    function loadCategoryPosts(categoryId) {
        fetch(`/Blog/GetPostsByCategory/${categoryId}`)
            .then(response => response.json())
            .then(posts => {
                if (posts.length > 0) {
                    loadBlogPost(posts[0].id);
                } else {
                    blogContent.innerHTML = '<p>No posts available in this category.</p>';
                }
            })
            .catch(error => {
                console.error('Error loading category posts:', error);
                blogContent.innerHTML = '<p>Error loading category posts. Please try again later.</p>';
            });
    }

    function loadBlogPost(postId) {
        fetch(`/Blog/GetPost/${postId}`)
            .then(response => response.json())
            .then(post => {
                blogContent.innerHTML = `
                    <h1>${post.title}</h1>
                    <p>Category: ${post.category?.name || 'Uncategorized'}</p>
                    <p>Published: ${new Date(post.publishedDate).toLocaleDateString()}</p>
                    <div>${post.content}</div>
                `;
            })
            .catch(error => {
                console.error('Error loading blog post:', error);
                blogContent.innerHTML = '<p>Error loading blog post. Please try again later.</p>';
            });
    }
});