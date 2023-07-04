using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using DarBeya.Data;
using DarBeya.Models;
using Microsoft.AspNetCore.Authorization;

namespace DarBeya.Pages.Admin.Robes
{
    [Authorize]
    public class DetailsModel : PageModel
    {
        private readonly DarBeya.Data.DataContext _context;

        public DetailsModel(DarBeya.Data.DataContext context)
        {
            _context = context;
        }

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
    }
}
