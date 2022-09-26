const books = [];
const RENDER_EVENT = "render-book";
const SAVED_EVENT = "saved-book";
const STORAGE_KEY = "BOOKSHELF_APPS";

const addBookButton = document.getElementById("addBookButton");
const formContainer = document.getElementById("formContainer");
const submitButton = document.getElementById("submitButton");
const cancelButton = document.getElementById("cancelButton");
const inputBook = document.getElementById("inputBook");

const overlay = document.getElementById("overlay");

const booksCount = document.getElementById("books-count");
const completeCount = document.getElementById("complete-count");
const incompleteCount = document.getElementById("incomplete-count");

const resetButton = document.querySelector(".reset-button");

addBookButton.addEventListener("click", openFormContainer);
overlay.addEventListener("click", closeFormContainer);

resetButton.addEventListener("click", () => {
	document.getElementById("inputSearchBook").value = "";
	searchBook();
});

function customAlert(message) {
	const elementCustomAlert = document.createElement("div");
	elementCustomAlert.classList.add("alert");
	elementCustomAlert.innerText = message;

	document.body.insertBefore(elementCustomAlert, document.body.children[0]);
	setTimeout(() => {
		elementCustomAlert.remove();
	}, 1500);
}

function openFormContainer() {
	inputBook.reset();
	formContainer.classList.add("active");
	overlay.classList.add("active");
}

function closeFormContainer() {
	formContainer.classList.remove("active");
	overlay.classList.remove("active");
}

function generateId() {
	return +new Date();
}

function generateBookObject(id, title, author, year, isCompleted) {
	return {
		id,
		title,
		author,
		year,
		isCompleted,
	};
}

function findBook(bookId) {
	for (const bookItem of books) {
		if (bookItem.id === bookId) {
			return bookItem;
		}
	}
	return null;
}

function findBookIndex(bookId) {
	for (const index in books) {
		if (books[index].id === bookId) {
			return index;
		}
	}
	return -1;
}

function isStorageExist() {
	if (typeof Storage === undefined) {
		customAlert("Browser Anda tidak mendukung local storage JavaScript");
		return false;
	}
	return true;
}

function saveData() {
	if (isStorageExist()) {
		const parsed = JSON.stringify(books);
		localStorage.setItem(STORAGE_KEY, parsed);
		document.dispatchEvent(new Event(SAVED_EVENT));
	}
}

function loadDataFromStorage() {
	const serializedData = localStorage.getItem(STORAGE_KEY);
	let data = JSON.parse(serializedData);

	if (data !== null) {
		for (const book of data) {
			books.push(book);
		}
	}
	document.dispatchEvent(new Event(RENDER_EVENT));
}

function updateBooksCount() {
	booksCount.textContent = books.length;
	let complete = books.filter((book) => book.isCompleted);
	completeCount.textContent = complete.length;
	incompleteCount.textContent = books.length - complete.length;
}

function createBook(bookObject) {
	const bookTitle = document.createElement("h3");
	const bookYear = document.createElement("p");
	bookTitle.innerText = bookObject.title + " (" + bookObject.year + ")";

	const bookAuthor = document.createElement("p");
	bookAuthor.innerText = bookObject.author;

	const article = document.createElement("article");
	article.classList.add("book_item");
	article.append(bookTitle, bookAuthor, bookYear);

	article.setAttribute("id", `book-${bookObject.id}`);

	if (bookObject.isCompleted) {
		const moveFromCompleteButton = document.createElement("button");
		moveFromCompleteButton.classList.add("check");
		moveFromCompleteButton.innerText = "Tandai Belum Selesai Dibaca";

		moveFromCompleteButton.addEventListener("click", function () {
			removeFromCompleted(bookObject.id);
			customAlert("Buku berhasil dipindahkan");
		});

		const deleteButton = document.createElement("button");
		deleteButton.classList.add("delete");
		deleteButton.innerText = "Hapus Buku";

		deleteButton.addEventListener("click", function () {
			removeBook(bookObject.id);
		});

		const bookAction = document.createElement("div");
		bookAction.classList.add("action");
		bookAction.append(moveFromCompleteButton, deleteButton);

		article.append(bookAction);
	} else {
		const moveToCompleteButton = document.createElement("button");
		moveToCompleteButton.classList.add("check");
		moveToCompleteButton.innerText = "Tandai Selesai Dibaca";

		moveToCompleteButton.addEventListener("click", function () {
			moveToCompleted(bookObject.id);
			customAlert("Buku berhasil dipindahkan");
		});

		const deleteButton = document.createElement("button");
		deleteButton.classList.add("delete");
		deleteButton.innerText = "Hapus Buku";

		deleteButton.addEventListener("click", function () {
			removeBook(bookObject.id);
		});

		const bookAction = document.createElement("div");
		bookAction.classList.add("action");
		bookAction.append(moveToCompleteButton, deleteButton);
		article.append(bookAction);
	}
	updateBooksCount();
	return article;
}

function addBook() {
	const bookTitle = document.getElementById("inputBookTitle").value;
	const bookAuthor = document.getElementById("inputBookAuthor").value;
	const bookYear = document.getElementById("inputBookYear").value;
	const inputBookIsComplete = document.getElementById("inputBookIsComplete");

	if (!inputBookIsComplete.checked) {
		const bookID = generateId();
		const bookObject = generateBookObject(
			bookID,
			bookTitle,
			bookAuthor,
			bookYear,
			false
		);
		books.push(bookObject);
	} else {
		const bookID = generateId();
		const bookObject = generateBookObject(
			bookID,
			bookTitle,
			bookAuthor,
			bookYear,
			true
		);
		books.push(bookObject);
		completeBookList.append(bookObject);
	}
	document.dispatchEvent(new Event(RENDER_EVENT));
	updateBooksCount();
	saveData();
}

function moveToCompleteButton() {
	const inputBookIsComplete = document.getElementById("inputBookIsComplete");
	inputBookIsComplete.addEventListener("click", function () {
		if (inputBookIsComplete.checked) {
			document.getElementById("addBookButton").innerHTML =
				"<strong>Selesai Dibaca</strong>";
		} else {
			document.getElementById("addBookButton").innerHTML =
				"<strong>Belum Selesai Dibaca</strong>";
		}
	});
}

function searchBook() {
	const inputSearchBook = document.getElementById("inputSearchBook").value;
	const bookTitle = document.querySelectorAll("article");

	for (const book of bookTitle) {
		if (!book.innerText.toLowerCase().includes(inputSearchBook.toLowerCase())) {
			book.style.display = "none";
			customAlert("Hasil tidak ditemukan");
		} else {
			if (inputSearchBook == "") {
				book.style.display = "inline-block";
				customAlert("Pencarian direset");
			} else {
				book.style.display = "inline-block";
				customAlert("Hasil ditemukan");
			}
		}
	}
}

function moveToCompleted(bookId) {
	const targetBook = findBook(bookId);
	if (targetBook == null) return;
	targetBook.isCompleted = true;
	document.dispatchEvent(new Event(RENDER_EVENT));
	saveData();
}

function removeBook(bookId) {
	if (confirm("Apakah Anda yakin untuk menghapus buku ini?")) {
		const targetBook = findBookIndex(bookId);
		if (targetBook === -1) return;
		books.splice(targetBook, 1);
		document.dispatchEvent(new Event(RENDER_EVENT));
		saveData();
		updateBooksCount();
		customAlert("Buku berhasil dihapus");
	}
}

function removeFromCompleted(bookId) {
	const targetBook = findBook(bookId);
	if (targetBook == null) return;
	targetBook.isCompleted = false;
	document.dispatchEvent(new Event(RENDER_EVENT));
	saveData();
}

document.addEventListener("DOMContentLoaded", function () {
	const submitForm = document.getElementById("inputBook");
	const inputBookIsComplete = document.getElementById("inputBookIsComplete");
	const searchSubmit = document.getElementById("searchSubmit");

	submitForm.addEventListener("submit", function (event) {
		event.preventDefault();
		addBook();
		closeFormContainer();
		customAlert("Buku berhasil ditambahkan");
	});

	inputBookIsComplete.addEventListener("input", function (event) {
		moveToCompleteButton();
	});

	searchSubmit.addEventListener("click", function (event) {
		event.preventDefault();
		searchBook();
	});

	if (isStorageExist()) {
		loadDataFromStorage();
	}
});

document.addEventListener(SAVED_EVENT, function () {
	console.log("Data berhasil disimpan");
});

document.addEventListener(RENDER_EVENT, function () {
	const incompleteBookList = document.getElementById("incompleteBookList");
	const completeBookList = document.getElementById("completeBookList");
	incompleteBookList.innerHTML = "";
	completeBookList.innerHTML = "";
	for (const bookItem of books) {
		const bookElement = createBook(bookItem);
		if (bookItem.isCompleted) completeBookList.append(bookElement);
		else incompleteBookList.append(bookElement);
	}
});
