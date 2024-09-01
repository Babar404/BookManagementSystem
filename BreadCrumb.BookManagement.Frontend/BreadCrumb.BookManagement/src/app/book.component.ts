import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';  
import { BookHttpService as BookHttpService } from './services/book-http-service';
import { of, Subscription } from 'rxjs';
import { Book } from './book';
import { SelectionModel } from '@angular/cdk/collections';
import {v4 as uuidv4} from 'uuid';
import { MatTableDataSource } from '@angular/material/table';
import { MatSelectionList } from '@angular/material/list';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BookDialogComponent } from './components/create-book/create-book.component';
import { MatPaginator } from '@angular/material/paginator';
import { PaginatedResponse } from './services/pagination';

  
@Component({
  selector: 'app-root',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],  
})
export class BookComponent implements OnDestroy, OnInit {
  
  dataSource: MatTableDataSource<Book>;
  isLoading: boolean = false;  
  bookSelected : boolean = false;

  books: Book[] = [];
  bookStatuses : string[] = [];
  newBookTitle: string = '';
  newBookAuthor: string = '';
  newBookIsbn: string = '';
  newBookPublishedDate: Date | null = null;
  errorMessage: string | null = null;
  isAnyBookSelected : boolean | false = false;

  totalItems = 0;
  pageSize = 10; //default size
 
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  private static subscriptions: Subscription[] = [];

  selection = new SelectionModel<Book>(true, []);

  displayedColumns: string[] = ['select','title', 'author', 'isbn', 'publishedDate'];

  selectedBook: Book | null = null;

  
  constructor(private bookHttpService : BookHttpService, private dialog : MatDialog){
    this.dataSource = new MatTableDataSource<Book>();

  }

  toggleAllSelection() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => {        
          this.selection.select(row);        
      });
  }

  toggleSelection(book: Book) {
    this.selection.toggle(book);

    this.isAnyBookSelected = this.selection.selected.length == 0 ? true : false;
  }

  loadPage(pageIndex: number, pageSize: number): void {
    const pageNumber = pageIndex + 1;
    this.bookHttpService.getPagedRecords(pageNumber, pageSize)
                        .subscribe(response => {
                                                  this.totalItems = response.totalItems;
                                                  this.dataSource.data = response.items;
                                                });
  }

  isAllSelected() {
    
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  
  ngOnInit() {

    this.dataSource.paginator = this.paginator;
    this.init();
  }   

  ngAfterViewInit() 
  {    
    if(this.selection)
    {   
      this.selection.changed.subscribe(() => 
      {      
        console.log('Selection changed:', this.selection.selected);
      });
    }
  }

  appendBookInBooksGrid(newBook : Book) {
        
    this.books.push(newBook);
    this.dataSource.data = this.books;
    this.resetForm();    
  }

  deleteSelectedBooks() {
    
    const selectedBooks = this.selection.selected; // Get all selected books            
    const selectedIds = selectedBooks.map(a => a.id);

    if (selectedBooks.length === 0) 
      {
        alert('No book selected.');
        return;
      }

    this.bookHttpService.deleteBooks(selectedIds).subscribe(
      () => 
      {         
        selectedBooks.forEach(selectedBook => 
        {
          var bookIndex = this.books.findIndex(t => t.id == selectedBook.id);
          this.books.splice(bookIndex, 1);
        });

        this.dataSource.data = this.books; // Refresh the table data
        this.selection.clear(); // Clear selection after deletion
      },
      error => console.error('Error deleting books', error)
    );
  } 
  private resetForm() {

    this.newBookTitle = '';
    this.newBookAuthor = '';
    this.newBookIsbn = '';
    this.newBookPublishedDate = null;
    this.errorMessage = null;    
  }

  selectBook(book: Book): void {
    
    this.selectedBook = book;
  }

  isSelected(book: Book): boolean 
  {
    return this.selectedBook === book;
  }
 
  public init()
  {
    this.isLoading = true;
    var bookHttpSubscription = this.bookHttpService.getAllBooks()
                                   .subscribe(payload =>{
                                    setTimeout( ()=> {
                                      debugger;
                                      
                                      this.dataSource = new MatTableDataSource<Book>(payload);
                                      this.books.push(...payload);
                                      this.isLoading = false; 
                                      
                                    }, 500);
                                 },
                                 (error) => {
                                  debugger;
                                      this.isLoading = false;

                                      this.dataSource = new MatTableDataSource<Book>();
                                 });

                                 BookComponent.subscriptions.push(bookHttpSubscription);                                          
  }

  ngOnDestroy(): void {

    BookComponent.subscriptions.forEach(subscription => subscription ? subscription.unsubscribe() : 0);
    BookComponent.subscriptions = [];

  }

  createBook() : void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = { };
  
    const dialogRef = this.dialog.open(BookDialogComponent, dialogConfig);

    dialogRef.componentInstance.bookAdded.subscribe((newBook: Book) => {
      this.appendBookInBooksGrid(newBook);
    });
  }
}
