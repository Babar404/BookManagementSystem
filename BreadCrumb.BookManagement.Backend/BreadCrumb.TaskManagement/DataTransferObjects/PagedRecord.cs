namespace BreadCrumb.BookManagement.DataTransferObjects
{
    public class PagedRecord
    {
        public int TotalItems { get; private set; }
        public int PageNumber { get; private set; }
        public int PageSize { get; private set; }
        public List<Book> Items { get; private set; }

        public PagedRecord(int totalItems, int pageNumber, int pageSize, List<Book> items)
        {
            TotalItems = totalItems;
            PageNumber = pageNumber;
            PageSize = pageSize;

            Items = items;
        }
    }
}
