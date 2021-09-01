using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookManagement.Models;
using Microsoft.AspNetCore.Cors;
using BookManagement.Services;
namespace BookManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private BookService _bookService { get; set; }

        public  BooksController(){

            _bookService = new BookService();

        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Book>>> GetAllBooks()
        {
            try
            {
                var books = await _bookService.GetAllBooks();
                return books.ToList();
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> GetBookById(int id)
        {
            try
            {
                var book = await _bookService.GetBookById(id);
                return book;

            }
            catch (Exception e)
            {

                return NotFound(e.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Book>> UpdateBook(int id, Book book)
        {
            try
            {
                var updatedBook = await _bookService.UpdateBook(id,book);
                return NoContent();
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }
        [HttpPost]
        public async Task<ActionResult<Book>> CreateBook( Book book)
        {
            try
            {
                var createdBook = await _bookService.CreateBook(book);


                return CreatedAtAction(nameof(GetBookById),new{Id=createdBook.Id}, createdBook);

            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<Book>> DeleteBook(int id)
        {
            try
            {
                 await _bookService.DeleteBook(id);
                return NoContent();
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }
    }
}
