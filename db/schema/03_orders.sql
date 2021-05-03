-- Drop and recreate Items table

DROP TABLE IF EXISTS orders CASCADE;
CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  time_placed TIMESTAMP,
  time_confirmed TIMESTAMP,
  time_fulfilled TIMESTAMP,
  order_status VARCHAR(255) NOT NULL
);
