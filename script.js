function createTable() {
    return `
        <table>
            <caption>Книжечки</caption>
            <thead></thead>
            <tbody></tbody>
        </table>
    `
}



function createTableHeader(gnrs, books) {
    let filterBooks = books;
    const row = document.createElement("tr");
    const name = document.createElement("th");
    name.innerText = "Название";

    const author = document.createElement("th");
    author.innerText = "Автор";
    author.addEventListener("click", e => {
        const tbody = document.querySelector("tbody");
        author.dataset.sort = author.dataset.sort && date.dataset.sort === "down" ? "up" : "down"; 
        filterBooks.sort((b2, b1) => {
            return author.dataset.sort === "down" && b1.author < b2.author ? -1 : 1;
        });
        console.log(filterBooks)
        tbody.innerHTML = "";
        filterBooks.forEach(b => {
            tbody.append(createRow(b));
        })
    });

    const genre = document.createElement("th");
    const genre_lbl = document.createElement("label");
    const genre_sel = document.createElement("select");
    genre_lbl.innerText = "Жанр";
    genre_lbl.htmlFor = "genre";
    genre_sel.id = genre;
    genre_sel.addEventListener("change", e => {
        const tbody = document.querySelector("tbody");
        let val = e.target.value;
        filterBooks = val === "all" // если пользователь выберет в select "Все жанры"
            ? books // мы сохраняем все 12 книжек
            : books.filter(b => { // иначе
                if (b.genre === val) { // находим книги по выбранному жанру
                    return b; // и возвращаем только эти книги (наполняем массив с нужными книгами)
                }
            })
        tbody.innerHTML = "";
        filterBooks.forEach(b => {
            tbody.append(createRow(b));
        })
    })
    genre_sel.append(new Option("Все жанры", "all"));
    gnrs?.forEach(g => genre_sel.append(new Option(g)));
    genre.append(genre_lbl, genre_sel);


    const date = document.createElement("th");
    date.innerText = "Дата публикации";
    // date.dataset.sort
    date.addEventListener("click", e => {
        const tbody = document.querySelector("tbody");
        date.dataset.sort = date.dataset.sort && date.dataset.sort === "down" ? "up" : "down"; 
        filterBooks.sort((b2, b1) => {
            const d1 = new Date(b1.published).getTime(),
                  d2 = new Date(b2.published).getTime();
            return date.dataset.sort === "down" ? d1 - d2 : d2 - d1;
        });
        console.log(filterBooks)
        tbody.innerHTML = "";
        filterBooks.forEach(b => {
            tbody.append(createRow(b));
        })
    });

    row.append(name, author, genre, date);
    return row;
}

function createRow(obj) {
    const row = document.createElement("tr");
    const name = document.createElement("td");
    name.innerText = obj.title;

    const author = document.createElement("td");
    author.innerText = obj.author;

    const genre = document.createElement("td");
    genre.innerText = obj.genre;

    const date = document.createElement("td");
    date.innerText = obj.published;

    row.append(name, author, genre, date);
    return row;
}

( async () => {
    const genres = ["Fantasy", "Dramma", "Romantic", "Detective", "Horrors", "Classic"];
    let books = [];
    let res = await fetch("https://fakerapi.it/api/v1/books?_quantity=12");
    let data = await res.json();
    data.data.forEach(el => {
        el.genre = genres[Math.floor(Math.random() * genres.length)]
        books.push(el);
    });
    console.log(books);

    const box = document.querySelector(".container");


    // books.forEach(b => {
    //     box.innerHTML += `<div class="book">
    //         <span>${b.title}</span>
    //     </div>`
    // })
    let thead, tbody;
    if (books.length) {
        box.innerHTML += createTable()
        thead = document.querySelector("thead");
        tbody = document.querySelector("tbody");
    }
    if (thead) {
        thead.append(createTableHeader(genres, books))
    }
    if (tbody) {
        books.forEach(b => {
            tbody.append(createRow(b));
        })
    }










})()