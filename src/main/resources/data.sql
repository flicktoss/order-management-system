-- Insert sample products
INSERT INTO products (name, description, price, stock, active, category, image_url) VALUES
('Laptop Pro 15', 'High-performance laptop with 16GB RAM and 512GB SSD', 1299.99, 25, true, 'Electronics', 'https://example.com/laptop.jpg'),
('Wireless Mouse', 'Ergonomic wireless mouse with 6 buttons', 29.99, 150, true, 'Electronics', 'https://example.com/mouse.jpg'),
('Mechanical Keyboard', 'RGB mechanical keyboard with Cherry MX switches', 149.99, 75, true, 'Electronics', 'https://example.com/keyboard.jpg'),
('USB-C Hub', '7-in-1 USB-C hub with HDMI and SD card reader', 49.99, 100, true, 'Electronics', 'https://example.com/hub.jpg'),
('Laptop Stand', 'Adjustable aluminum laptop stand', 39.99, 200, true, 'Accessories', 'https://example.com/stand.jpg'),
('Webcam HD', '1080p HD webcam with built-in microphone', 79.99, 50, true, 'Electronics', 'https://example.com/webcam.jpg'),
('Desk Lamp', 'LED desk lamp with adjustable brightness', 34.99, 120, true, 'Accessories', 'https://example.com/lamp.jpg'),
('Phone Case', 'Durable phone case with shock absorption', 19.99, 300, true, 'Accessories', 'https://example.com/case.jpg'),
('Noise Cancelling Headphones', 'Premium wireless headphones with ANC', 299.99, 40, true, 'Electronics', 'https://example.com/headphones.jpg'),
('Portable Charger', '20000mAh power bank with fast charging', 59.99, 80, true, 'Electronics', 'https://example.com/charger.jpg');

SELECT setval('id', (SELECT MAX(id) FROM products) + 1, false);