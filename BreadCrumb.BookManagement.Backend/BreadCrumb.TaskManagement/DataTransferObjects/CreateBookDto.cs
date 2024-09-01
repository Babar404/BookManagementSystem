using System.ComponentModel.DataAnnotations;

namespace BreadCrumb.BookManagement.DataTransferObjects
{
    public class CreateBookDto
    {
        [Required]
        public required string Title { get; set; }

        [Required]
        public required string Author { get; set; }

        [Required]
        public required string Isbn { get; set; }

        [Required]
        public DateTime PublishedDate { get; set; }
    }
}
