using DarBeya.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DarBeya.Pages
{
    public class CollectionRobesModel : PageModel
    {
        private readonly DarBeya.Data.DataContext _context;

        public CollectionRobesModel(DarBeya.Data.DataContext context)
        {
            _context = context;
        }

        public IList<Robe> Robe { get; set; }

        public async Task OnGetAsync()
        {
            Robe = await _context.Robes.ToListAsync();
        }
    }
}
