INSERT INTO users (username, password)
VALUES ("dokastho", "password");

INSERT INTO galleries (owner, name, dateTaken)
VALUES ("dokastho", "Friends", "2023-04-21");
INSERT INTO galleries (owner, name, description)
VALUES ("dokastho", "Cycling", "Sporty");
INSERT INTO galleries (owner, name)
VALUES ("dokastho", "Untitled");

INSERT INTO pictures (galleryId, owner, name, uuid, description, stars)
VALUES (1, "dokastho", "Elizabeth", "IMG_3745.jpg", "", 0);
INSERT INTO pictures (galleryId, owner, name, uuid, description, stars)
VALUES (1, "dokastho", "Phoebe", "IMG_3746.jpg", "", 0);
INSERT INTO pictures (galleryId, owner, name, uuid, description, stars)
VALUES (1, "dokastho", "Elizabeth (Photographer)", "IMG_3751.jpg", "Photographer slay.", 3);
INSERT INTO pictures (galleryId, owner, name, uuid, description, stars)
VALUES (1, "dokastho", "Blurry", "IMG_3759.jpg", "", 0);
INSERT INTO pictures (galleryId, owner, name, uuid, description, stars)
VALUES (1, "dokastho", "Phoebe & I", "IMG_3762.jpg", "", 1);
INSERT INTO pictures (galleryId, owner, name, uuid, description, stars)
VALUES (1, "dokastho", "Caitlin & Phoebe", "IMG_3769.jpg", "Taking goofy pictures.", 2);
INSERT INTO pictures (galleryId, owner, name, uuid, description, stars)
VALUES (1, "dokastho", "Phoebe & I (Again)", "IMG_3779.jpg", "My hair is abominable.", 1);

INSERT INTO pictures (galleryId, owner, name, uuid, description, stars)
VALUES (2, "dokastho", "Me", "IMG_0865.jpg", "Me staying on my bike", 3);
INSERT INTO pictures (galleryId, owner, name, uuid, description, stars)
VALUES (2, "dokastho", "Drew", "IMG_0895.jpg", "", 1);
INSERT INTO pictures (galleryId, owner, name, uuid, description, stars)
VALUES (2, "dokastho", "Drew 2", "IMG_0955.jpg", "Sprinting", 1);
INSERT INTO pictures (galleryId, owner, name, uuid, description, stars)
VALUES (2, "dokastho", "Sam", "IMG_0979.jpg", "", 0);
INSERT INTO pictures (galleryId, owner, name, uuid, description, stars)
VALUES (2, "dokastho", "Kurt", "IMG_1029.jpg", "", 0);

