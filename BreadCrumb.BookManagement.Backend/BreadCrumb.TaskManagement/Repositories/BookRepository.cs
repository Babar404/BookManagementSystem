using Microsoft.EntityFrameworkCore;
using BreadCrumb.BookManagement.DataTransferObjects;

namespace BreadCrumb.BookManagement.Repositories
{
    public interface IBookRepository
    {
        Task AddAsync(Book Book);
        Task DeleteAsync(int id);
        Task<Book?> GetByIdAsync(int id);        
        Task<List<Book>> GetAllBooks();
        Task<PagedRecord> GetPagedRecordsAsync(int pageNumber, int pageSize);

        Task SaveAsync();
    }

    public class BookRepository : IBookRepository
    {
        private readonly BookManagementDbContext _context;

        public BookRepository(BookManagementDbContext context)
        {
            _context = context;
        }

        public async Task DeleteAsync(int id)
        {
            var Book = await _context.Books.FindAsync(id);

            if (Book != null)
            {
                _context.Books.Remove(Book);
            }
        }

        public async Task AddAsync(Book Book)
        {
            await _context.Books.AddAsync(Book);
        }

        public async Task<Book?> GetByIdAsync(int id)
        {
            return _context.Books == null || !_context.Books.Any() ? await Task.FromResult<Book>(null) : await _context.Books.FindAsync(id);
        }

        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }               
        public async Task<List<Book>> GetAllBooks()
        {
            return await _context.Books.ToListAsync();
        }

        public async Task<PagedRecord> GetPagedRecordsAsync(int pageNumber, int pageSize)
        {
            var totalItems = await _context.Books.CountAsync();
            var items = await _context.Books
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return new PagedRecord(totalItems, pageNumber, pageSize, items);            
        }
    }
}
