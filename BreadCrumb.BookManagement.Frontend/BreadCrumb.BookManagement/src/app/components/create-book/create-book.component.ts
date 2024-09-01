import { Component, EventEmitter, Inject, OnInit, Output } from "@angular/core";
import {v4 as uuidv4} from 'uuid';
import { FormBuilder, FormGroup } from "@angular/forms";

import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import { BookHttpService } from "../../services/book-http-service";
import { Book } from "../../book";

@Component({
    selector: 'create-book',
    templateUrl: './create-book.component.html',
    styleUrls: ['./create-book.component.scss'],
})
export class BookDialogComponent implements OnInit {

    form: FormGroup | any;
    newBookTitle:string | null;
    newBookAuthor:string;
    newBookIsbn:string;         
    newBookPublishedDate : Date | null;
    errorMessage : string | null;
    @Output() bookAdded = new EventEmitter<Book>();

    constructor(private bookHttpService : BookHttpService,        
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<BookDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data : any) {
        
        this.newBookIsbn = data.Isbn;
        this.newBookAuthor = data.author;
        this.newBookTitle = data.title;
        this.newBookPublishedDate = data.publishedDate;
        this.errorMessage = "";
    }

    ngOnInit() {

        this.form = this.fb.group({
            description: [this.newBookTitle, []],
            publishedDate: [this.newBookPublishedDate, []],
        });
    }

    save() {
      if(this.form)
      {        
        this.dialogRef.close(this.form.value);
      }
    }

    close() {
        this.dialogRef.close();
    }

    onSubmit(): void 
    {
        if (this.newBookTitle != null && this.newBookTitle.length <= 10) 
        {
          this.errorMessage = 'Book title must be longer than 10 characters.';
          return;
        }

        if (!this.newBookPublishedDate) 
        {
              this.errorMessage = 'Published date must be defined.';
              return;
        }

        if ( this.newBookTitle != null && this.newBookPublishedDate)
        {    
            const newBook: Book = 
            {
                id: uuidv4(),
                title : this.newBookTitle,                
                isbn:this.newBookIsbn,
                publishedDate:this.newBookPublishedDate as Date,
                author : this.newBookAuthor
            };
        
            this.bookHttpService.createBook(newBook).subscribe((book: Book) => 
            {
                debugger;
                this.bookAdded.emit(book);
                this.dialogRef.close(book);
            },
            (error) => 
            {
                var message = error.error;
                console.error('Error adding book', error);
                this.errorMessage = `Failed to add book. ${message}`;
            });
        }
      }
}