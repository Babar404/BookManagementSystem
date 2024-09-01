using Microsoft.AspNetCore.Mvc;
using BreadCrumb.BookManagement.DataTransferObjects;
using BreadCrumb.BookManagement.Repositories;

namespace BreadCrumb.BookManagement
{
    [ApiController]
    [Route("[controller]")]
    public class BookController : ControllerBase
    {
        private readonly IBookRepository _bookRepository;
        private readonly ILogger<BookController> _logger;
        public BookController(ILogger<BookController> logger, IBookRepository BookRepository)
        {
            _logger = logger;
            _bookRepository = BookRepository;
        }

        // POST: api/Books/
        [HttpPost(Name = nameof(CreateBook))]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]

        public async Task<ActionResult<Book>> CreateBook([FromBody] CreateBookDto createBookDto)
        {
            if (!ModelState.IsValid)
            {
                _logger.LogError("Bad Request : Book payload data not provided correctly.!");
                return BadRequest(ModelState);
            }

            if (createBookDto.PublishedDate > DateTime.UtcNow)
            {
                _logger.LogError("Bad Request : The published date cannot be in the future.!");
                return BadRequest("The published date cannot be in the future.");
            }

            var book = new Book
            {
                Title = createBookDto.Title,
                PublishedDate = createBookDto.PublishedDate,
                Author = createBookDto.Author,
                Isbn = createBookDto.Isbn                
            };

            await _bookRepository.AddAsync(book);
            await _bookRepository.SaveAsync();

            _logger.LogError($"Book created at path : {nameof(GetBookById)} with id : {book.Id}");
            return CreatedAtAction(nameof(GetBookById), new { id = book.Id }, book);
        }


        // POST: api/Books
        [HttpDelete(Name = nameof(DeleteBooks))]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> DeleteBooks([FromBody] int[] ids)
        {
            if (ids == null || ids.Length == 0)
            {
                _logger.LogError($"Request body is empty. Please provide Book id's.");
                return BadRequest("No Book IDs provided.");
            }

            foreach (var id in ids)
            {
                var Book = await _bookRepository.GetByIdAsync(id);
                
                if(Book != null)
                    await _bookRepository.DeleteAsync(id);
                else
                    _logger.LogError($"DeleteBook : Book with id : {id}. not found!");
            }

            await _bookRepository.SaveAsync();
            return NoContent();
        }                        

        [HttpGet("{id}", Name = nameof(GetBookById))]
        [ProducesResponseType(302)]
        [ProducesResponseType(404)]
        //GET : api/Books/id
        public async Task<ActionResult<Book>> GetBookById(int id)
        {
            var Book = await _bookRepository.GetByIdAsync(id);

            if (Book == null)
            {
                _logger.LogError($"Not Found : No Book found with id {id}.");
                return NotFound();
            }

            return Book;
        }
        
        // GET: api/Books
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        [HttpGet(Name = nameof(GetAllBooks))]

        public async Task<ActionResult<IEnumerable<Book>>> GetAllBooks()
        {
            var allBooks = await _bookRepository.GetAllBooks();
            
            return Ok(allBooks);
        }

        [HttpGet("page", Name = nameof(GetPage))]
        [ProducesResponseType(200)]
        public async Task<ActionResult<PagedRecord>> GetPage([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        {
            return Ok(await _bookRepository.GetPagedRecordsAsync(pageNumber, pageSize));            
        }
    }
}
