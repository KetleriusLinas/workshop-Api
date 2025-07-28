const kingBooksDOM = document.getElementById("king-books");
const loaderDOM = document.getElementById('loader');
const tableDOM = document.getElementById('table');


tableDOM.classList.add('hide');
loaderDOM.classList.add('show');

fetch("https://stephen-king-api.onrender.com/api/books")
  .then((res) => res.json())
  .then((data) => {
    // console.log(data);


    loaderDOM.classList.remove('show');
    tableDOM.classList.remove('hide');


    data.data.forEach((book) => {
      kingBooksDOM.insertAdjacentHTML("beforeend",
        `<tr data-bookid="${book.id}">
                <td>${book.Title}</td>
                <td>${book.Year}</td>
                <td>${book.Publisher}</td>
                <td>${book.ISBN}</td>
                <td>${book.Pages}</td>
                <td>${book.Notes[0] ? book.Notes.join('; ') : 'There is no NOTES for this book'}</td>
            </tr>`
      );
    });
  })
  .catch((error) => console.log(error));


kingBooksDOM.addEventListener('click', e => {
  // console.log(e.target.parentElement.dataset.bookid);
  const boodId = e.target.parentElement.dataset.bookid;
  fetch("https://stephen-king-api.onrender.com/api/book/" + boodId)
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
});