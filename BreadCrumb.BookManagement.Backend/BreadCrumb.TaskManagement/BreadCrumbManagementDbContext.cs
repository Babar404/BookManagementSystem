using Microsoft.EntityFrameworkCore;

namespace BreadCrumb.BookManagement
{
    public class BookManagementDbContext : DbContext
    {
        public DbSet<Book> Books { get; set; }

        public BookManagementDbContext(DbContextOptions<BookManagementDbContext> options) : base(options)
        {
        }                
    }
}
