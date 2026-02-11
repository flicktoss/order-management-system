-- ============================================
-- DEMO DATA FOR ORDER MANAGEMENT SYSTEM
-- ============================================

-- Insert sample products (25 products across multiple categories)
INSERT INTO products (name, description, price, stock, active, category, image_url) VALUES
-- Electronics
('Laptop Pro 15', 'High-performance laptop with 16GB RAM and 512GB SSD', 1299.99, 25, true, 'Electronics', 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400'),
('Gaming Laptop', 'RGB gaming laptop with RTX 4060 and 32GB RAM', 1899.99, 15, true, 'Electronics', 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400'),
('Wireless Mouse', 'Ergonomic wireless mouse with 6 buttons', 29.99, 150, true, 'Electronics', 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400'),
('Mechanical Keyboard', 'RGB mechanical keyboard with Cherry MX switches', 149.99, 75, true, 'Electronics', 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400'),
('USB-C Hub', '7-in-1 USB-C hub with HDMI and SD card reader', 49.99, 100, true, 'Electronics', 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400'),
('Webcam HD', '1080p HD webcam with built-in microphone', 79.99, 50, true, 'Electronics', 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=400'),
('Noise Cancelling Headphones', 'Premium wireless headphones with ANC', 299.99, 40, true, 'Electronics', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400'),
('Portable Charger', '20000mAh power bank with fast charging', 59.99, 80, true, 'Electronics', 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400'),
('4K Monitor 27"', 'Ultra HD monitor with HDR support', 449.99, 30, true, 'Electronics', 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400'),
('Wireless Earbuds', 'True wireless earbuds with noise cancellation', 179.99, 120, true, 'Electronics', 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400'),
-- Accessories
('Laptop Stand', 'Adjustable aluminum laptop stand', 39.99, 200, true, 'Accessories', 'https://images.unsplash.com/photo-1625225233840-695456021cde?w=400'),
('Desk Lamp', 'LED desk lamp with adjustable brightness', 34.99, 120, true, 'Accessories', 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400'),
('Phone Case', 'Durable phone case with shock absorption', 19.99, 300, true, 'Accessories', 'https://images.unsplash.com/photo-1601593346740-925612772716?w=400'),
('Cable Organizer', 'Magnetic cable management system', 24.99, 180, true, 'Accessories', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'),
('Screen Protector', 'Tempered glass screen protector', 14.99, 250, true, 'Accessories', 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400'),
('Laptop Sleeve', 'Waterproof laptop sleeve 15.6 inch', 29.99, 150, true, 'Accessories', 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400'),
-- Office
('Ergonomic Chair', 'Premium office chair with lumbar support', 349.99, 45, true, 'Office', 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400'),
('Standing Desk', 'Electric adjustable standing desk', 599.99, 20, true, 'Office', 'https://images.unsplash.com/photo-1595515106969-1ce29566ff2c?w=400'),
('Desk Organizer', 'Bamboo desk organizer with charging station', 44.99, 90, true, 'Office', 'https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=400'),
('Whiteboard', 'Magnetic dry erase whiteboard 36x24', 79.99, 60, true, 'Office', 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400'),
-- Storage
('External SSD 1TB', 'Portable SSD with USB 3.2 Gen 2', 129.99, 70, true, 'Storage', 'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=400'),
('USB Flash Drive 128GB', 'High-speed USB 3.0 flash drive', 24.99, 200, true, 'Storage', 'https://images.unsplash.com/photo-1624823183493-ed5832f48f18?w=400'),
('NAS 4-Bay', 'Network Attached Storage with 8TB capacity', 799.99, 15, true, 'Storage', 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400'),
('SD Card 256GB', 'High-speed UHS-I SD card for cameras', 49.99, 140, true, 'Storage', 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400'),
('Cloud Storage Plan', '1-year subscription for 2TB cloud storage', 99.99, 999, true, 'Storage', 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400');

-- Insert demo users (password for all: password123)
-- BCrypt hash for 'password123': $2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy
INSERT INTO users (name, email, password, phone, address, role, created_at, updated_at) VALUES
('Admin User', 'admin@demo.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '9876543210', '123 Admin Street, New York, NY 10001', 'ADMIN', NOW(), NOW()),
('John Doe', 'john.doe@demo.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '9876543211', '456 Oak Avenue, Los Angeles, CA 90001', 'USER', NOW(), NOW()),
('Jane Smith', 'jane.smith@demo.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '9876543212', '789 Pine Road, Chicago, IL 60601', 'USER', NOW(), NOW()),
('Mike Johnson', 'mike.johnson@demo.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '9876543213', '321 Maple Drive, Houston, TX 77001', 'USER', NOW(), NOW()),
('Sarah Williams', 'sarah.williams@demo.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '9876543214', '654 Elm Street, Phoenix, AZ 85001', 'USER', NOW(), NOW());

-- Insert demo orders
INSERT INTO orders (order_number, user_id, total_amount, status, shipping_address, notes, created_at, updated_at) VALUES
('ORD-2024-001', 2, 1529.97, 'DELIVERED', '456 Oak Avenue, Los Angeles, CA 90001', 'Please deliver before 5 PM', NOW() - INTERVAL '15 days', NOW() - INTERVAL '10 days'),
('ORD-2024-002', 3, 2279.96, 'SHIPPED', '789 Pine Road, Chicago, IL 60601', 'Fragile items - handle with care', NOW() - INTERVAL '10 days', NOW() - INTERVAL '5 days'),
('ORD-2024-003', 4, 454.97, 'PROCESSING', '321 Maple Drive, Houston, TX 77001', 'Gift wrap requested', NOW() - INTERVAL '5 days', NOW() - INTERVAL '4 days'),
('ORD-2024-004', 5, 899.95, 'PENDING', '654 Elm Street, Phoenix, AZ 85001', NULL, NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days'),
('ORD-2024-005', 2, 179.99, 'DELIVERED', '456 Oak Avenue, Los Angeles, CA 90001', 'Leave at doorstep', NOW() - INTERVAL '20 days', NOW() - INTERVAL '15 days'),
('ORD-2024-006', 3, 1349.97, 'CANCELLED', '789 Pine Road, Chicago, IL 60601', 'Customer requested cancellation', NOW() - INTERVAL '8 days', NOW() - INTERVAL '7 days'),
('ORD-2024-007', 4, 724.96, 'SHIPPED', '321 Maple Drive, Houston, TX 77001', 'Express delivery', NOW() - INTERVAL '2 days', NOW() - INTERVAL '1 days'),
('ORD-2024-008', 2, 3099.93, 'PROCESSING', '456 Oak Avenue, Los Angeles, CA 90001', 'Office setup - bulk order', NOW() - INTERVAL '1 days', NOW());

-- Insert order items for each order
-- Order 1 (John Doe - DELIVERED)
INSERT INTO order_items (order_id, product_id, quantity, price, subtotal) VALUES
(1, 1, 1, 1299.99, 1299.99),  -- Laptop Pro 15
(1, 3, 1, 29.99, 29.99),      -- Wireless Mouse
(1, 5, 1, 49.99, 49.99),      -- USB-C Hub
(1, 11, 1, 39.99, 39.99),     -- Laptop Stand
(1, 16, 1, 29.99, 29.99);     -- Laptop Sleeve

-- Order 2 (Jane Smith - SHIPPED)
INSERT INTO order_items (order_id, product_id, quantity, price, subtotal) VALUES
(2, 2, 1, 1899.99, 1899.99),  -- Gaming Laptop
(2, 4, 1, 149.99, 149.99),    -- Mechanical Keyboard
(2, 7, 1, 299.99, 299.99),    -- Noise Cancelling Headphones
(2, 11, 1, 39.99, 39.99);     -- Laptop Stand

-- Order 3 (Mike Johnson - PROCESSING)
INSERT INTO order_items (order_id, product_id, quantity, price, subtotal) VALUES
(3, 9, 1, 449.99, 449.99),    -- 4K Monitor
(3, 21, 1, 129.99, 129.99),   -- External SSD
(3, 14, 3, 24.99, 74.99);     -- Cable Organizer (x3)

-- Order 4 (Sarah Williams - PENDING)
INSERT INTO order_items (order_id, product_id, quantity, price, subtotal) VALUES
(4, 17, 1, 349.99, 349.99),   -- Ergonomic Chair
(4, 18, 1, 599.99, 599.99),   -- Standing Desk
(4, 19, 2, 44.99, 89.99);     -- Desk Organizer (x2)

-- Order 5 (John Doe - DELIVERED)
INSERT INTO order_items (order_id, product_id, quantity, price, subtotal) VALUES
(5, 10, 1, 179.99, 179.99);   -- Wireless Earbuds

-- Order 6 (Jane Smith - CANCELLED)
INSERT INTO order_items (order_id, product_id, quantity, price, subtotal) VALUES
(6, 1, 1, 1299.99, 1299.99),  -- Laptop Pro 15
(6, 8, 1, 59.99, 59.99);      -- Portable Charger

-- Order 7 (Mike Johnson - SHIPPED)
INSERT INTO order_items (order_id, product_id, quantity, price, subtotal) VALUES
(7, 9, 1, 449.99, 449.99),    -- 4K Monitor
(7, 4, 1, 149.99, 149.99),    -- Mechanical Keyboard
(7, 21, 1, 129.99, 129.99);   -- External SSD

-- Order 8 (John Doe - PROCESSING)
INSERT INTO order_items (order_id, product_id, quantity, price, subtotal) VALUES
(8, 2, 1, 1899.99, 1899.99),  -- Gaming Laptop
(8, 9, 2, 449.99, 899.98),    -- 4K Monitor (x2)
(8, 17, 1, 349.99, 349.99),   -- Ergonautic Chair
(8, 12, 3, 34.99, 104.97);    -- Desk Lamp (x3)