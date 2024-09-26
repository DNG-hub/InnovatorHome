using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace InnovatorHome.Pages
{
    public class ContactUsModel : PageModel
    {
        [BindProperty]
        public string? Name { get; set; }

        [BindProperty]
        public string? Email { get; set; }

        [BindProperty]
        public string? Phone { get; set; }

        [BindProperty]
        public string? Subject { get; set; }

        [BindProperty]
        public string? Message { get; set; }

        public void OnGet()
        {
        }

        public IActionResult OnPost()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            // Process the form data (e.g., send email, save to database)
            // For now, we'll just redirect to a Thank You page or back to the form
            return RedirectToPage("ContactUsThankYou");
        }
    }
}
