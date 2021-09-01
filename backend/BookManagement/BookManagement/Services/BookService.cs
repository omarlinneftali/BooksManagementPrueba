using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookManagement.Models;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Json;
namespace BookManagement.Services
{
    public class BookService
    {
        private readonly HttpClient _httpClient;
        private readonly string _baseApiUri = "https://fakerestapi.azurewebsites.net/api/v1/Books";

        public BookService()
        {
            _httpClient = new HttpClient();

        }

        private string GetApiUriWithId(int id)
        {
            return $"{_baseApiUri}/{id}";
        }

        public async Task<IEnumerable<Book>> GetAllBooks()
        {
           
            try
            {
                var books = await _httpClient.GetFromJsonAsync<IEnumerable<Book>>(_baseApiUri);
                return books;
            }

            catch (HttpRequestException e)
            {

                throw e;
            }

            catch (Exception e)
            {

                throw e;
            }

          
            
        }

        public async Task<Book> GetBookById(int id)
        {
           
            try
            {
                var apiUriWithId = GetApiUriWithId(id);
                var book = await _httpClient.GetFromJsonAsync<Book>(apiUriWithId);
                return book;
            }

            catch (HttpRequestException e)
            {

                throw e;
            }

            catch (Exception e)
            {

                throw e;
            }

        }

        public async Task<Book> CreateBook(Book book)
        {
            
            try
            {

                var response = await _httpClient.PostAsJsonAsync<Book>(_baseApiUri, book);

                response.EnsureSuccessStatusCode();
                var bookCreated = await response.Content.ReadFromJsonAsync<Book>();
                return bookCreated;
            }
            catch (HttpRequestException e)
            {

                throw e;
            }

            catch (Exception e)
            {

                throw e;
            }

        }

        public async Task<Book> UpdateBook(int id, Book book)
        {

            try
            {
                var apiUriWithId = GetApiUriWithId(id);
                var response = await _httpClient.PutAsJsonAsync<Book>(apiUriWithId, book);

                response.EnsureSuccessStatusCode();

                var bookUpdated = await response.Content.ReadFromJsonAsync<Book>();
                return bookUpdated;
            }
            catch (HttpRequestException e)
            {

                throw e;
            }

            catch (Exception e)
            {

                throw e;
            }

        }

        public async Task<bool> DeleteBook(int id)
        {

            try
            {
                var apiUriWithId = GetApiUriWithId(id);
                var response = await _httpClient.DeleteAsync(apiUriWithId);

                response.EnsureSuccessStatusCode();

        
                return true;
            }
            catch (HttpRequestException e)
            {

                throw e;
            }

            catch (Exception e)
            {

                throw e;
            }

        }




    }
}
