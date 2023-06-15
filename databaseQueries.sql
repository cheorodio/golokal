CREATE TABLE vendors (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name varchar(30) NOT NULL,
  shop_name varchar(30) NOT NULL,
  bio varchar(500) NOT NULL
);

INSERT INTO vendors
  (name, shop_name, bio)
VALUES
  ('Lisa', 'vidaShop', 'This is a quick intro about Lisa and products that she makes. This is a quick intro about Lisa and products that she makes.' ),
  ('Tony', 'the_soap_company', 'This is a quick intro about Lisa and products that she makes. This is a quick intro about Lisa and products that she makes.' ),
  ('Liz', 'lumaShop', 'This is a quick intro about Lisa and products that she makes. This is a quick intro about Lisa and products that she makes. This is a quick intro about Lisa and products that she makes. '),
  ('Kate', 'company_name', 'This is a quick intro about Lisa and products that she makes. This is a quick intro about Lisa and products that she makes.' );
