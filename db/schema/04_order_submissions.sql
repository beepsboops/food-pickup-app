-- Drop and recreate Order_submissions table

DROP TABLE IF EXISTS order_submissions CASCADE;
CREATE TABLE order_submissions (
  id SERIAL PRIMARY KEY NOT NULL,
  order_id INTEGER REFERENCES orders(id),
  item_id INTEGER REFERENCES items(id),
  quantity INTEGER,
  UNIQUE (order_id, item_id)
);
