let books = [];
let idCounter = 1;

// endpoint untuk mendapatkan semua buku
exports.getAllBooks = (req, res) => {
  res.json(books);
};

// endpoint untuk mendapatkan buku berdasarkan id nya
exports.getBookById = (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json(book);
};

// endpoint untuk menambahkan buku
exports.createBook = (req, res) => {
  const { title, author, published_year } = req.body;
  if (!title || !author || !published_year) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  const newBook = { id: idCounter++, title, author, published_year };
  books.push(newBook);
  res.status(201).json(newBook);
};

// endpoint untuk mengupdate buku
exports.updateBook = (req, res) => {
  const { id } = req.params;
  const { title, author, published_year } = req.body;
  const book = books.find(b => b.id === parseInt(id));
  if (!book) return res.status(404).json({ message: 'Book not found' });

  book.title = title ?? book.title;
  book.author = author ?? book.author;
  book.published_year = published_year ?? book.published_year;

  res.json(book);
};

// endpoint untuk menghapus buku
exports.deleteBook = (req, res) => {
  const { id } = req.params;
  const index = books.findIndex(b => b.id === parseInt(id));
  if (index === -1) return res.status(404).json({ message: 'Book not found' });

  books.splice(index, 1);
  res.json({ message: 'Book deleted' });
};
