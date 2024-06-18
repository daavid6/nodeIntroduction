drop database if exists movies_db;
create database movies_db;

use movies_db;

drop table if exists movie;
create table movie (
	id binary(16) primary key default (UUID_TO_BIN(uuid())),
    title varchar(255) not null,
    year int not null,
    director varchar(255) not null,
    duration int not null,
    poster text,
    rate decimal(2,1) unsigned not null
);

drop table if exists genre;
create table genre (
	id int auto_increment primary key,
    name varchar(255) not null unique
);

drop table if exists movie_genres;
create table movie_genres (
	movie_id binary(16) references movie(id),
	genre_id int references genre(id),
    
    primary key(movie_id, genre_id)
);

insert into genre (name) values
('Drama'),
('Action'),
('Crime'),
('Adventure'),
('Sci-Fi'),
('Romance'),
('Animation'),
('Fantasy'),
('Biography');

INSERT INTO movie (id, title, year, director, duration, poster, rate) VALUES
(UNHEX(REPLACE('dcdd0fad-a94c-4810-8acc-5f108d3b18c3', '-', '')), 'The Shawshank Redemption', 1994, 'Frank Darabont', 142, 'https://i.ebayimg.com/images/g/4goAAOSwMyBe7hnQ/s-l1200.webp', 9.3),
(UNHEX(REPLACE('c8a7d63f-3b04-44d3-9d95-8782fd7dcfaf', '-', '')), 'The Dark Knight', 2008, 'Christopher Nolan', 152, 'https://i.ebayimg.com/images/g/yokAAOSw8w1YARbm/s-l1200.jpg', 9.0),
(UNHEX(REPLACE('5ad1a235-0d9c-410a-b32b-220d91689a08', '-', '')), 'Inception', 2010, 'Christopher Nolan', 148, 'https://m.media-amazon.com/images/I/91Rc8cAmnAL._AC_UF1000,1000_QL80_.jpg', 8.8),
(UNHEX(REPLACE('241bf55d-b649-4109-af7c-0e6890ded3fc', '-', '')), 'Pulp Fiction', 1994, 'Quentin Tarantino', 154, 'https://www.themoviedb.org/t/p/original/vQWk5YBFWF4bZaofAbv0tShwBvQ.jpg', 8.9),
(UNHEX(REPLACE('9e6106f0-848b-4810-a11a-3d832a5610f9', '-', '')), 'Forrest Gump', 1994, 'Robert Zemeckis', 142, 'https://i.ebayimg.com/images/g/qR8AAOSwkvRZzuMD/s-l1600.jpg', 8.8),
(UNHEX(REPLACE('7e3fd5ab-60ff-4ae2-92b6-9597f0308d1', '-', '')), 'Gladiator', 2000, 'Ridley Scott', 155, 'https://img.fruugo.com/product/0/60/14417600_max.jpg', 8.5),
(UNHEX(REPLACE('c906673b-3948-4402-ac7f-73ac3a9e3105', '-', '')), 'The Matrix', 1999, 'Lana Wachowski', 136, 'https://i.ebayimg.com/images/g/QFQAAOSwAQpfjaA6/s-l1200.jpg', 8.7),
(UNHEX(REPLACE('b6e03689-cccd-478e-8565-d92f40813b13', '-', '')), 'Interstellar', 2014, 'Christopher Nolan', 169, 'https://m.media-amazon.com/images/I/91obuWzA3XL._AC_UF1000,1000_QL80_.jpg', 8.6),
(UNHEX(REPLACE('aa391090-b938-42eb-b520-86ea0aa3917b', '-', '')), 'The Lord of the Rings: The Return of the King', 2003, 'Peter Jackson', 201, 'https://i.ebayimg.com/images/g/0hoAAOSwe7peaMLW/s-l1600.jpg', 8.9),
(UNHEX(REPLACE('2e6900e2-0b48-4fb6-ad48-09c7086e54fe', '-', '')), 'The Lion King', 1994, 'Roger Allers, Rob Minkoff', 88, 'https://m.media-amazon.com/images/I/81BMmrwSFOL._AC_UF1000,1000_QL80_.jpg', 8.5),
(UNHEX(REPLACE('04986507-b3ed-442c-8ae7-4c5df804f896', '-', '')), 'The Avengers', 2012, 'Joss Whedon', 143, 'https://img.fruugo.com/product/7/41/14532417_max.jpg', 8.0),
(UNHEX(REPLACE('7d2832f8-c70a-410e-8963-4c93bf36cc9c', '-', '')), 'Jurassic Park', 1993, 'Steven Spielberg', 127, 'https://vice-press.com/cdn/shop/products/Jurassic-Park-Editions-poster-florey.jpg?v=1654518755&width=1024', 8.1),
(UNHEX(REPLACE('ccf36f2e-8566-47f7-912d-9f4647250bc7', '-', '')), 'Titanic', 1997, 'James Cameron', 195, 'https://i.pinimg.com/originals/42/42/65/4242658e6f1b0d6322a4a93e0383108b.png', 7.8),
(UNHEX(REPLACE('8fb17ae1-bdfe-45e5-a871-4772d7e526b8', '-', '')), 'The Social Network', 2010, 'David Fincher', 120, 'https://i.pinimg.com/originals/7e/37/b9/7e37b994b613e94cba64f307b1983e39.jpg', 7.7),
(UNHEX(REPLACE('6a360a18-c645-4b47-9a7b-2a71babbf3e0', '-', '')), 'Avatar', 2009, 'James Cameron', 162, 'https://i.etsystatic.com/35681979/r/il/dfe3ba/3957859451/il_fullxfull.3957859451_h27r.jpg', 7.8);

insert into movie_genres (movie_id, genre_id) values
(UNHEX(REPLACE('dcdd0fad-a94c-4810-8acc-5f108d3b18c3', '-', '')), 1), -- The Shawshank Redemption: Drama
(UNHEX(REPLACE('c8a7d63f-3b04-44d3-9d95-8782fd7dcfaf', '-', '')), 2), -- The Dark Knight: Action
(UNHEX(REPLACE('c8a7d63f-3b04-44d3-9d95-8782fd7dcfaf', '-', '')), 3), -- The Dark Knight: Crime
(UNHEX(REPLACE('c8a7d63f-3b04-44d3-9d95-8782fd7dcfaf', '-', '')), 1), -- The Dark Knight: Drama
(UNHEX(REPLACE('5ad1a235-0d9c-410a-b32b-220d91689a08', '-', '')), 2), -- Inception: Action
(UNHEX(REPLACE('5ad1a235-0d9c-410a-b32b-220d91689a08', '-', '')), 4), -- Inception: Adventure
(UNHEX(REPLACE('5ad1a235-0d9c-410a-b32b-220d91689a08', '-', '')), 5), -- Inception: Sci-Fi
(UNHEX(REPLACE('241bf55d-b649-4109-af7c-0e6890ded3fc', '-', '')), 3), -- Pulp Fiction: Crime
(UNHEX(REPLACE('241bf55d-b649-4109-af7c-0e6890ded3fc', '-', '')), 1), -- Pulp Fiction: Drama
(UNHEX(REPLACE('9e6106f0-848b-4810-a11a-3d832a5610f9', '-', '')), 1), -- Forrest Gump: Drama
(UNHEX(REPLACE('9e6106f0-848b-4810-a11a-3d832a5610f9', '-', '')), 6), -- Forrest Gump: Romance
(UNHEX(REPLACE('7e3fd5ab-60ff-4ae2-92b6-9597f0308d1', '-', '')), 2), -- Gladiator: Action
(UNHEX(REPLACE('7e3fd5ab-60ff-4ae2-92b6-9597f0308d1', '-', '')), 4), -- Gladiator: Adventure
(UNHEX(REPLACE('7e3fd5ab-60ff-4ae2-92b6-9597f0308d1', '-', '')), 1), -- Gladiator: Drama
(UNHEX(REPLACE('c906673b-3948-4402-ac7f-73ac3a9e3105', '-', '')), 2), -- The Matrix: Action
(UNHEX(REPLACE('c906673b-3948-4402-ac7f-73ac3a9e3105', '-', '')), 5), -- The Matrix: Sci-Fi
(UNHEX(REPLACE('b6e03689-cccd-478e-8565-d92f40813b13', '-', '')), 4), -- Interstellar: Adventure
(UNHEX(REPLACE('b6e03689-cccd-478e-8565-d92f40813b13', '-', '')), 1), -- Interstellar: Drama
(UNHEX(REPLACE('b6e03689-cccd-478e-8565-d92f40813b13', '-', '')), 5), -- Interstellar: Sci-Fi
(UNHEX(REPLACE('aa391090-b938-42eb-b520-86ea0aa3917b', '-', '')), 2), -- The Lord of the Rings: The Return of the King: Action
(UNHEX(REPLACE('aa391090-b938-42eb-b520-86ea0aa3917b', '-', '')), 4), -- The Lord of the Rings: The Return of the King: Adventure
(UNHEX(REPLACE('aa391090-b938-42eb-b520-86ea0aa3917b', '-', '')), 1), -- The Lord of the Rings: The Return of the King: Drama
(UNHEX(REPLACE('2e6900e2-0b48-4fb6-ad48-09c7086e54fe', '-', '')), 7), -- The Lion King: Animation
(UNHEX(REPLACE('2e6900e2-0b48-4fb6-ad48-09c7086e54fe', '-', '')), 4), -- The Lion King: Adventure
(UNHEX(REPLACE('2e6900e2-0b48-4fb6-ad48-09c7086e54fe', '-', '')), 1), -- The Lion King: Drama
(UNHEX(REPLACE('04986507-b3ed-442c-8ae7-4c5df804f896', '-', '')), 2), -- The Avengers: Action
(UNHEX(REPLACE('04986507-b3ed-442c-8ae7-4c5df804f896', '-', '')), 4), -- The Avengers: Adventure
(UNHEX(REPLACE('04986507-b3ed-442c-8ae7-4c5df804f896', '-', '')), 5), -- The Avengers: Sci-Fi
(UNHEX(REPLACE('7d2832f8-c70a-410e-8963-4c93bf36cc9c', '-', '')), 4), -- Jurassic Park: Adventure
(UNHEX(REPLACE('7d2832f8-c70a-410e-8963-4c93bf36cc9c', '-', '')), 5), -- Jurassic Park: Sci-Fi
(UNHEX(REPLACE('ccf36f2e-8566-47f7-912d-9f4647250bc7', '-', '')), 1), -- Titanic: Drama
(UNHEX(REPLACE('ccf36f2e-8566-47f7-912d-9f4647250bc7', '-', '')), 6), -- Titanic: Romance
(UNHEX(REPLACE('8fb17ae1-bdfe-45e5-a871-4772d7e526b8', '-', '')), 9), -- The Social Network: Biography
(UNHEX(REPLACE('8fb17ae1-bdfe-45e5-a871-4772d7e526b8', '-', '')), 1), -- The Social Network: Drama
(UNHEX(REPLACE('6a360a18-c645-4b47-9a7b-2a71babbf3e0', '-', '')), 2), -- Avatar: Action
(UNHEX(REPLACE('6a360a18-c645-4b47-9a7b-2a71babbf3e0', '-', '')), 4), -- Avatar: Adventure
(UNHEX(REPLACE('6a360a18-c645-4b47-9a7b-2a71babbf3e0', '-', '')), 8); -- Avatar: Fantasy