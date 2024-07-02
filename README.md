Before running the API, ensure you have the following installed:

- Node.js and npm
- MySQL server


Start the server use: 
npm start

To Insert Data: Use Postman to interact with the API.
- To add a book:
       Endpoint: http://localhost:5000/add-book
       Format: 

{
  "title": "Book Title",
  "author": "Author Name"
}

- To update a book: 
      Endpoint: http://localhost:5000/update-book/:id
       Format: 

{
  "title": "Updated Title",
  "author": "Updated Author"
}

-To fetch all books: 
      Endpoint: http://localhost:5000/books




