INSERT INTO users (username, password)
VALUES ("dokastho", "password");

INSERT INTO galleries (owner, name, description)
VALUES ("dokastho", "Dogs", "My favorite doggies");
INSERT INTO galleries (owner, name, description)
VALUES ("dokastho", "Friends", "");
INSERT INTO galleries (owner, name, description)
VALUES ("dokastho", "Cycling", "Sporty");
INSERT INTO galleries (owner, name, description)
VALUES ("dokastho", "Flowers", "Some practice shots");
INSERT INTO galleries (owner, name, description)
VALUES ("dokastho", "Graduation", "");

INSERT INTO pictures (galleryId, owner, uuid, name, description, stars)
VALUES (2, "dokastho", "Elizabeth", "IMG_3745.jpg", "desc", 0);
INSERT INTO pictures (galleryId, owner, uuid, name, description, stars)
VALUES (2, "dokastho", "Phoebe", "IMG_3746.jpg", "desc", 0);
INSERT INTO pictures (galleryId, owner, uuid, name, description, stars)
VALUES (2, "dokastho", "Elizabeth (Photographer)", "IMG_3751.jpg", "desc", 3);
INSERT INTO pictures (galleryId, owner, uuid, name, description, stars)
VALUES (2, "dokastho", "Blurry", "IMG_3759.jpg", "desc", 0);
INSERT INTO pictures (galleryId, owner, uuid, name, description, stars)
VALUES (2, "dokastho", "Phoebe & I", "IMG_3762.jpg", "desc", 1);
INSERT INTO pictures (galleryId, owner, uuid, name, description, stars)
VALUES (2, "dokastho", "Caitlin & Phoebe", "IMG_3769.jpg", "desc", 2);
INSERT INTO pictures (galleryId, owner, uuid, name, description, stars)
VALUES (2, "dokastho", "Phoebe & I (Again)", "IMG_3779.jpg", "desc", 1);

