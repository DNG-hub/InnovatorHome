using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace InnovatorHome.Pages
{
    /// <summary>
    /// Represents the model for the Index page of the InnovatorHome application.
    /// </summary>
    public class IndexModel : PageModel
    {
        private readonly ILogger<IndexModel> _logger;

        /// <summary>
        /// Initializes a new instance of the <see cref="IndexModel"/> class.
        /// </summary>
        /// <param name="logger">The logger used for diagnostic logging.</param>
        public IndexModel(ILogger<IndexModel> logger)
        {
            _logger = logger;
        }

        /// <summary>
        /// Handles GET requests for the Index page.
        /// </summary>
        public void OnGet()
        {
            // Any initialization logic for the Index page can be added here
        }
    }
}
