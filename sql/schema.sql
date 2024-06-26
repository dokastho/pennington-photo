PRAGMA foreign_keys = ON;

CREATE TABLE users(
  username VARCHAR(20) NOT NULL,
  password VARCHAR(256) NOT NULL,
  created DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(username)
);

CREATE TABLE galleries(
  galleryId INTEGER PRIMARY KEY AUTOINCREMENT,
  type VARCHAR(20) NOT NULL,
  owner VARCHAR(20) NOT NULL,
  name VARCHAR(256) NOT NULL,
  description VARCHAR(256),
  created DATETIME DEFAULT CURRENT_TIMESTAMP,
  dateTaken DATE,
  ordernum INTEGER NOT NULL,
  FOREIGN KEY(owner) REFERENCES users(username) ON DELETE CASCADE
);

CREATE TABLE pictures(
  pictureId INTEGER PRIMARY KEY AUTOINCREMENT,
  galleryId INTEGER NOT NULL,
  owner VARCHAR(20) NOT NULL,
  uuid VARCHAR(256) NOT NULL,
  name VARCHAR(256) NOT NULL,
  description VARCHAR(256),
  stars INTEGER,
  qty INTEGER,
  total INTEGER,
  ordernum INTEGER NOT NULL,
  created DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(galleryId) REFERENCES galleries(galleryId) ON DELETE CASCADE,
  FOREIGN KEY(owner) REFERENCES users(username) ON DELETE CASCADE
);

CREATE TABLE sizenames(
  sizenameId INTEGER PRIMARY KEY AUTOINCREMENT,
  owner VARCHAR(20) NOT NULL,
  price INTEGER NOT NULL,
  name TINYTEXT NOT NULL,
  FOREIGN KEY(owner) REFERENCES users(username) ON DELETE CASCADE
);

CREATE TABLE pictureprices(
  picturepriceId INTEGER PRIMARY KEY AUTOINCREMENT,
  owner VARCHAR(20) NOT NULL,
  pictureId INTEGER NOT NULL,
  sizenameId INTEGER NOT NULL,
  price INTEGER,
  FOREIGN KEY(owner) REFERENCES users(username) ON DELETE CASCADE,
  FOREIGN KEY(pictureId) REFERENCES pictures(pictureId) ON DELETE CASCADE,
  FOREIGN KEY(sizenameId) REFERENCES sizenames(sizenameId) ON DELETE CASCADE
);
