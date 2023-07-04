using DarBeya.Models;
using Microsoft.EntityFrameworkCore;

namespace DarBeya.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }
        public DbSet<Robe> Robes { get; set; }
    }
}
