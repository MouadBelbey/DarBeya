using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using DarBeya.Data;
using DarBeya.Models;
using Microsoft.AspNetCore.Authorization;

namespace DarBeya.Pages.Admin.Robes
{
    [Authorize]
    public class EditModel : PageModel
    {
        private readonly DarBeya.Data.DataContext _context;

        public EditModel(DarBeya.Data.DataContext context)
        {
            _context = context;
        }

        [BindProperty]
        public Robe Robe { get; set; }

        public async Task<IActionResult> OnGetAsync(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            Robe = await _context.Robes.FirstOrDefaultAsync(m => m.RobeID == id);

            if (Robe == null)
            {
                return NotFound();
            }
            return Page();
        }

        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see https://aka.ms/RazorPagesCRUD.
        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            _context.Attach(Robe).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RobeExists(Robe.RobeID))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return RedirectToPage("./Index");
        }

        private bool RobeExists(int id)
        {
            return _context.Robes.Any(e => e.RobeID == id);
        }
    }
}
