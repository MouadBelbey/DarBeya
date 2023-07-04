using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using DarBeya.Data;
using DarBeya.Models;
using Microsoft.AspNetCore.Authorization;

namespace DarBeya.Pages.Admin.Robes
{
    [Authorize]
    public class CreateModel : PageModel
    {
        private readonly DarBeya.Data.DataContext _context;

        public CreateModel(DarBeya.Data.DataContext context)
        {
            _context = context;
        }

        public IActionResult OnGet()
        {
            return Page();
        }

        [BindProperty]
        public Robe Robe { get; set; }

        // To protect from overposting attacks, see https://aka.ms/RazorPagesCRUD
        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            _context.Robes.Add(Robe);
            await _context.SaveChangesAsync();

            return RedirectToPage("./Index");
        }
    }
}
