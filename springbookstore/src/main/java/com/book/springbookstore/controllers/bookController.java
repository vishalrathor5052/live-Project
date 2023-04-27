package com.book.springbookstore.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.book.springbookstore.entities.Book;
import com.book.springbookstore.services.bookService;

@RestController
public class bookController {
 @Autowired   
private bookService bookservice;
    //get book hendler

    
    @GetMapping("/books")
    public List<Book> getBook()
    {
        return this.bookservice.getAllBook();
    }


    //Search book hendler using by id
    @GetMapping("/books/{id}")
    public Book GetBookById(@PathVariable("id") int id)
    {
        return bookservice.getBookById(id);
    }

    //add book hendler
    @PostMapping("/books")
    public Book addBook(@RequestBody Book book)
    {
        Book b = this.bookservice.addBook(book);
        System.out.println(book);
        return b;
    }

    //delete book hendler
    @DeleteMapping("/books/{bookId}")
    public void deleteBook(@PathVariable("bookId") int bId)
    {
        this.bookservice.deleteBook(bId);
    }

    @PutMapping("/books/{bookId}")
    public Book updateBook(@RequestBody Book book , @PathVariable("bookId") int id)
    {
        this.bookservice.updateBook(book,id);
        return book;
    }
}
