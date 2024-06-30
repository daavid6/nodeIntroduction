drop database if exists restaurant_booking_db;
create database restaurant_booking_db;

use restaurant_booking_db;

-- Drop the tables if they exist
drop table if exists booking;
drop table if exists dining_table;
drop table if exists restaurant;
drop table if exists user;

-- Create tables
create table restaurant (
    id int auto_increment,
    name varchar(255) not null,
    address varchar(255),
    primary key (id)
);

create table dining_table (
    number int,
    restaurant_id int,
    seats int not null,
    primary key (restaurant_id, number),
    foreign key (restaurant_id) references restaurant(id),
    constraint seats_gt_zero check (seats > 0)
);

create table user (
    id int auto_increment,
    username varchar(50) not null,
    password varchar(255) not null,
    email varchar(100),
    primary key (id),
    unique (username, password, email)
);

create table booking (
    id int auto_increment,
    user_id int,
    restaurant_id int,
    table_number int,
    booking_date datetime not null,
    primary key (id),
    foreign key (user_id) references `user`(id),
    foreign key (restaurant_id) references restaurant(id),
    foreign key (table_number, restaurant_id) references dining_table(number, restaurant_id)
);

-- Insertions
insert into restaurant (name, address) values
    ('Restaurant A', '123 Main St'),
    ('Restaurant B', '456 Elm St'),
    ('Restaurant C', '789 Oak St');

-- Insert dining tables for Restaurant A
insert into dining_table (number, restaurant_id, seats) values
    (1, 1, 4),  -- Table 1 at Restaurant A with 4 seats
    (2, 1, 6);  -- Table 2 at Restaurant A with 6 seats

-- Insert dining tables for Restaurant B
insert into dining_table (number, restaurant_id, seats) values
    (1, 2, 6),  -- Table 1 at Restaurant B with 6 seats
    (2, 2, 8);  -- Table 2 at Restaurant B with 8 seats

-- Insert dining tables for Restaurant C
insert into dining_table (number, restaurant_id, seats) values
    (1, 3, 2),  -- Table 1 at Restaurant C with 2 seats
    (2, 3, 4);  -- Table 2 at Restaurant C with 4 seats
    
-- Insert sample users
insert into user (username, password, email) values
    ('john_doe', 'password123', 'john@example.com'),
    ('jane_smith', 'securepass', 'jane@example.com');
    
-- Insert sample bookings
insert into booking (booking_date, restaurant_id, user_id, table_number)
values ('2024-07-01 18:00:00', 1, 1, 1),
       ('2024-07-02 19:00:00', 2, 2, 2);