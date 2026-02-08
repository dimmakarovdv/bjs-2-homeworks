// ДЗ№1
class PrintEditionItem {
  constructor(name, releaseDate, pagesCount) {
    this.name = name;
    this.releaseDate = releaseDate;
    this.pagesCount = pagesCount;
    this._state = 100;
    this.type = null;
  }

  fix() {
    this.state *= 1.5;
  }

  set state(value) {
    if (value < 0) {
      this._state = 0;
    } else if (value > 100) {
      this._state = 100;
    } else {
      this._state = value;
    }
  }

  get state() {
    return this._state;
  }
}

class Magazine extends PrintEditionItem {
  constructor(name, releaseDate, pagesCount) {
    super(name, releaseDate, pagesCount);
    this.type = "magazine";
  }
}

class Book extends PrintEditionItem {
  constructor(author, name, releaseDate, pagesCount) {
    super(name, releaseDate, pagesCount);
    this.author = author;
    this.type = "book";
  }
}

class NovelBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = "novel";
  }
}

class FantasticBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = "fantastic";
  }
}

class DetectiveBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = "detective";
  }
}

// ДЗ№2
class Library {
  constructor(name) {
    this.name = name;
    this.books = [];
  }

  addBook(book) {
    if (book.state > 30) {
      this.books.push(book);
    }
    return this;
  }

  findBookBy(type, value) {
    for (let book of this.books) {
      if (book[type] === value) {
        return book;
      }
    }
    return null;
  }

  giveBookByName(bookName) {
    for (let i = 0; i < this.books.length; i++) {
      if (this.books[i].name === bookName) {
        const book = this.books[i];
        this.books.splice(i, 1);
        return book;
      }
    }
    return null;
  }
}

// ДЗ№3
class Student {
  constructor(name) {
    this.name = name;
    this.marks = {};
  }

  addMark(mark, subject) {
    if (mark < 2 || mark > 5) {
      return;
    }

    if (!this.marks[subject]) {
      this.marks[subject] = [];
    }

    this.marks[subject].push(mark);
  }

  getAverageBySubject(subject) {
    if (!this.marks[subject] || this.marks[subject].length === 0) {
      return 0;
    }

    const sum = this.marks[subject].reduce((acc, mark) => acc + mark, 0);
    return sum / this.marks[subject].length;
  }

  getAverage() {
    const subjects = Object.keys(this.marks);
    if (subjects.length === 0) {
      return 0;
    }

    const sum = subjects.reduce((acc, subject) => {
      return acc + this.getAverageBySubject(subject);
    }, 0);
    return sum / subjects.length;
  }
}

function testCase() {
  console.log("\n=== Тестирование ДЗ№1 ===/n");

  const sherlock = new PrintEditionItem(
    "Коллекция основных творений Николая Васильевича Гоголя",
    2019,
    1008,
  );

  console.log("Год выпуска:", sherlock.releaseDate);
  console.log("Состояние:", sherlock.state);
  sherlock.fix();
  console.log("Состояние после fix():", sherlock.state);

  const picknick = new FantasticBook(
    "Александр Сергеевич Пушкин",
    "О царе Салтане",
    1831,
    168,
  );

  console.log("\nАвтор:", picknick.author);
  picknick.state = 10;
  console.log("Состояние:", picknick.state);
  picknick.fix();
  console.log("Состояние после восстановления:", picknick.state);

  console.log("\n=== Тестирование ДЗ№2 ===/n");

  const library = new Library("Библиотека имени имени Ахияра Хакима");

  library.addBook(
    new DetectiveBook(
      "Артур Конан Дойл",
      "Коллекция основных творений Николая Васильевича Гоголя",
      2019,
      1008,
    ),
  );
  library.addBook(
    new FantasticBook(
      "Александр Сергеевич Пушкин",
      "О царе Салтане",
      1831,
      168,
    ),
  );
  library.addBook(new NovelBook("Герберт Уэллс", "Машина времени", 1895, 138));
  library.addBook(new Magazine("Мурзилка", 1924, 60));

  console.log(
    "Поиск книги 'Властелин колец':",
    library.findBookBy("name", "Властелин колец"),
  );
  console.log(
    "Название книги 1924 года:",
    library.findBookBy("releaseDate", 1924).name,
  );

  console.log("Количество книг до выдачи:", library.books.length);
  library.giveBookByName("Машина времени");
  console.log("Количество книг после выдачи:", library.books.length);

  console.log("\n=== Тестирование ДЗ№3 ===/n");

  const student = new Student("Макаров Дмитрий");
  student.addMark(3, "химия");
  student.addMark(4, "химия");
  student.addMark(5, "физика");
  student.addMark(4, "физика");
  student.addMark(4, "физика");
  student.addMark(5, "физика");
  student.addMark(5, "ифнорматика");
  student.addMark(5, "ифнорматика");
  student.addMark(5, "ифнорматика");

  console.log("Средний балл по физике:", student.getAverageBySubject("физика"));
  console.log("Средний балл по химия:", student.getAverageBySubject("химия"));
  console.log(
    "Средний балл по ифнорматика:",
    student.getAverageBySubject("ифнорматика"),
  );
  console.log("Общий средний балл:", student.getAverage());
}

testCase();
