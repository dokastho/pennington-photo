INSERT INTO users (username, password)
VALUES  ("dokastho", "password"),
        ("donpen", "password"),
        ("janpen", "password");
INSERT INTO sizenames (owner, name)
VALUES  ("donpen", "Matted 11"" x 14"" Print"),
        ("donpen", "Matted 16"" x 20"" Print"),
        ("donpen", "Matted 20"" x 24"" Print"),
        ("donpen", "Matted 26"" x 32"" Print"),
        ("donpen", "Matted/Overmatted 16"" x 20"" Framed"),
        ("donpen", "Matted/Overmatted 28"" x 28"" Framed"),
        ("donpen", "Matted/Overmatted 22"" x 40"" Framed"),
        ("donpen", "Matted/Overmatted 32"" x 40"" Framed"),
        ("donpen", "Mirror Image 22"" x 40"" Framed"),
        ("donpen", "Mirror Image 32"" x 40"" Framed"),
        ("donpen", "Triptych 16"" x 32"" Framed"),
        ("donpen", "5”x 7” photographic card available with purchase of print.");
INSERT INTO defaultSizePrices (price, sizenameId)
VALUES (350, 1),
       (450, 2),
       (550, 3),
       (750, 4),
       (750, 5),
       (950, 6),
       (1250, 7),
       (1450, 8),
       (1250, 9),
       (1450, 10),
       (1450, 11);