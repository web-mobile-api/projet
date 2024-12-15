DROP TABLE IF EXISTS product CASCADE ;

CREATE TABLE product (
   id int primary key generated always as identity,
   name text,
   price decimal
);

INSERT INTO product(name, price)
VALUES ('Playstation 5', 499.99),
       ('NVIDIA RTX 4090 FE', 1829),
       ('Xbox Series X', 499.99);

DROP TABLE IF EXISTS client CASCADE;

CREATE TABLE client(
   id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
   name varchar,
   firstname varchar,
   address varchar,
   email varchar UNIQUE,
   password varchar
);

INSERT INTO client (name, firstname, address, email, password)
VALUES ('Poirier', 'Tevin', '11, rue du Faubourg National 95150 TAVERNY', 'poirier@mail.com', 'motdepasse');

DROP TABLE IF EXISTS purchase CASCADE;

CREATE TABLE purchase (
   product_id integer REFERENCES product(id) DEFERRABLE INITIALLY IMMEDIATE,
   client_id integer REFERENCES client(id) DEFERRABLE INITIALLY IMMEDIATE,
   quantity integer,
   "date" date default NOW(),
   PRIMARY KEY(product_id, client_id, "date")
);
