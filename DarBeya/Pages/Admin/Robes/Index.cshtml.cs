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
    public class IndexModel : PageModel
    {
        private readonly DarBeya.Data.DataContext _context;

        public IndexModel(DarBeya.Data.DataContext context)
        {
            _context = context;
        }

        public IList<Robe> Robe { get;set; }

        public async Task OnGetAsync()
        {
            Robe = await _context.Robes.ToListAsync();
        }
    }
}
