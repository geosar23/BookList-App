//Book Class
class Book{
    constructor(title,author,isbn){
        this.title=title;
        this.author=author;
        this.isbn=isbn;
    }
}

//UI Class
class UI {
    static displayBooks(){
        const books=Store.getBooks;

        books.forEach(book=>UI.addBookToList(book))
    }

    static addBookToList(book){
        const list=document.getElementById('book-list');

        const row=document.createElement('tr');

        row.innerHTML=`
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger dtn-sm delete">X</a></td>
        `

        list.appendChild(row);
    }

    static clearFields(){
        document.getElementById('title').value=''
        document.getElementById('author').value=''
        document.getElementById('isbn').value=''
    }

    static deleteBook(target){
        if(target.classList.contains('delete')){
            target.parentElement.parentElement.remove();
        }
    }
   

    static showAlert(message,className){
        const div = document.createElement('div');
        div.className=`alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container=document.querySelector('.container')
        const form=document.getElementById('book-form')
        container.insertBefore(div,form)

        //Vanish in 3 seconds
        setTimeout(()=>{
            document.querySelector('.alert').remove()
        },3000)
    }
}

//Store Class
class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books')===null){
            books=[];
        }else{
            books=JSON.parse(localStorage.getItem('books'));
            console.log(books)
        }

        return books;
    }

    static addBook(){
        const books=Store.getBooks();

        books.push(book);

        localStorage.setItem('books',JSON.stringify(books))
    }
    static removeBook(isbn){
        const books=Store.getBooks();
        books.forEach((book,index)=>{
            if(book.isbn===isbn){
                books.splice(index,1)
            }
        })

        localStorage.setItem('books',JSON.stringify(books))
    }
}



//Event:Display Books
document.addEventListener('DOMContentLoaded',UI.displayBooks)

//Event:Add a Book
document.getElementById('book-form').addEventListener('submit',(e)=>{
    //Prevent Default Action->submit
    e.preventDefault();
    
    //Get form values
    const title=document.getElementById('title').value;
    const author=document.getElementById('author').value;
    const isbn=document.getElementById('isbn').value;

    //Validation
    if(title===''||author===''||isbn===''){
        UI.showAlert('Please fill in all fields','danger')
    }else{
        //Creating book
        const book=new Book(title,author,isbn);

        //Add Book to UI
        UI.addBookToList(book)

        //Add Book to Store
        Store.addBook(book)

        //Show success message
        UI.showAlert('Book Added','success')

        //Clear Fields
        UI.clearFields();
    }
})

    

//Event:Remove a Book
document.getElementById('book-list').addEventListener('click',(e)=>{
    console.log(e.target)
    UI.deleteBook(e.target)

    //Show success message
    UI.showAlert('Book Removed','success')
})