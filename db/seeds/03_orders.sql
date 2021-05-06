-- Orders table seeds here
INSERT INTO orders (user_id, time_confirmed, time_fulfilled, order_status)
VALUES
  (1,'2008-01-01 00:03:00', '2008-01-01 00:40:00', 'Delivered'),
  (1,'2010-02-12 06:10:00', '2010-02-12 06:35:00', 'Delivered'),
  (1,'2020-12-10 18:18:00', '2020-12-10 18:55:00', 'Delivered'),
  (1, '2020-12-10 02:04:00', '2020-12-10 02:46:00', 'Started');

