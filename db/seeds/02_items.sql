-- Items table seeds here
-- @michelle, i changed your item prices, i think since we are working with integers (for simplicity???) i made the price in cents, so ($12.99 wings would be 1299 in the db?? thoughts?)
INSERT INTO items (name, description, thumbnail_photo, large_photo, price, stock)
VALUES
  ('Linguine Alle Vongole', 'Fresh B.C. clams tossed in an elegant white wine and garlic sauce. Served on linguine', './public/images/thumbnail_pasta.jpg', './public/images/large_pasta.jpg', 2299, 10),
  ('Caprese Salad', 'Vine rippened tomatos, buffalo mozzarella, fresh basil, kalamta olives. Drizzled with balsamic reduction.', './public/images/thumbnail_salad.jpg', './public/images/large_salad.jpg', 1199, 8),
  ('BAO Taiwanese steam buns', '3 Classic Buns - grilled pork belly, sweet peanut crumble, cilantro, pickled red onion, hoisin.', './public/images/thumbnail_bao.jpg', './public/images/large_bao.jpg', 1599, 30),
  ('Tofu Red Coconut Curry', 'Fresh vegetable medley and tofu in a spicy coconut curry sauce, served over jasmine rice.', './public/images/thumbnail_curry.jpg', './public/images/large_curry.jpg', 1599, 10),
  ('Baja Fish Tacos', 'Crispy catch of the day, coleslaw, pickled red onion, chipotle mayo. Served in two corn tortillas.', './public/images/thumbnail_tacos.jpg', './public/images/large_tacos.jpg', 999, 12),
  ('East Coast Donair', 'Tender, sliced, ground lamb, fresh tomatos, red onion, drizzeled with tangy donair sauce and wrapped in a warm pita.', './public/images/thumbnail_donair.jpg', './public/images/large_donair.jpg', 1299, 5),
  ('Double Stacked Cheese Burger', 'Two housemade all beef patties, layered with cheddar, maple bacon and all the classics. Served with fries.', './public/images/thumbnail_burger.jpg', './public/images/large_burger.jpg', 1699, 9);
