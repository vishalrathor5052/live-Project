package com.book.springbookstore.services;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;
import com.book.springbookstore.entities.Book;
@Component
public class bookService {
    
    public static List<Book> list = new ArrayList<>();

    static{
        list.add(new Book(101,"My life My Dream","A.P.J Abule Kalam Ajad"));
        list.add(new Book(102,"meri life journery","A.P.J Abule Kalam Ajad"));
        list.add(new Book(102,"wings of fire","A.P.J Abule Kalam Ajad"));
    }
    //get alll book
    public List<Book> getAllBook()
    {
        return list;
    }
    //get book usuing by id
    public Book getBookById(int id)
    {
        Book book=null;
        book= list.stream().filter(e->e.getId()==id).findFirst().get();
        return book;
    }

    //add book
    public Book addBook(Book b)
    {
        list.add(b);
        return b;
    }
    //delete Book  
    public void deleteBook(int bid)
    {
       list = list.stream().filter(book->book.getId()!= bid).collect(Collectors.toList());
    }

    //update book ny id
    public void updateBook(Book book ,int id)
    {
       list = list.stream().map(e->{
            if(e.getId()==id)
            {
                e.setTittle(book.getTittle());
                e.setAuthor(book.getAuthor());
            }
            return e;
        }).collect(Collectors.toList());
    }
}
