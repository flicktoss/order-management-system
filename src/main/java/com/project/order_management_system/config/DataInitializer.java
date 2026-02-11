package com.project.order_management_system.config;

import com.project.order_management_system.entity.Product;
import com.project.order_management_system.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;
import java.util.List;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class DataInitializer {

        private final org.springframework.cache.CacheManager cacheManager;
        private final com.project.order_management_system.repository.OrderRepository orderRepository;

        @Bean
        CommandLineRunner initDatabase(ProductRepository productRepository) {
                return args -> {
                        // FIX: Clear Redis cache on startup to prevent ClassCastException with DevTools
                        if (cacheManager.getCache("orders") != null)
                                cacheManager.getCache("orders").clear();
                        if (cacheManager.getCache("userOrders") != null)
                                cacheManager.getCache("userOrders").clear();
                        if (cacheManager.getCache("products") != null) {
                                cacheManager.getCache("products").clear();
                                log.info("🧹 Redis Cache cleared");
                        }

                        // CLEANUP: Unconditionally delete all previous orders and products
                        log.info("Cleaning up previous orders...");
                        orderRepository.deleteAll();
                        log.info("Previous orders deleted.");

                        log.info("Cleaning up previous products to remove duplicates...");
                        productRepository.deleteAll();
                        log.info("Previous products deleted.");

                        long currentCount = productRepository.count();
                        log.info("Current product count: {}", currentCount);

                        log.info("Checking demo products...");

                        // Helper to add product if not exists
                        List<Product> demoProducts = getDemoProducts();
                        for (Product p : demoProducts) {
                                addProductIfNotExists(productRepository, p);
                        }

                        log.info("✅ Data initialization complete! Total products: {}", productRepository.count());
                };
        }

        private void addProductIfNotExists(ProductRepository repository, Product product) {
                if (!repository.existsByName(product.getName())) {
                        repository.save(product);
                        log.info("Added demo product: {}", product.getName());
                } else {
                        log.info("Product already exists: {}", product.getName());
                }
        }

        private List<Product> getDemoProducts() {
                List<Product> products = new java.util.ArrayList<>();

                // --- Electronics ---
                products.add(Product.builder()
                                .name("MacBook Pro 16")
                                .description("M3 Max chip, 32GB RAM, 1TB SSD. The ultimate pro laptop.")
                                .price(new BigDecimal("2499.99"))
                                .stock(15)
                                .active(true)
                                .category("Electronics")
                                .imageUrl("https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500")
                                .build());

                products.add(Product.builder()
                                .name("Dell XPS 13 Plus")
                                .description("Ultra-thin, OLED display, 12th Gen Intel i7.")
                                .price(new BigDecimal("1399.99"))
                                .stock(20)
                                .active(true)
                                .category("Electronics")
                                .imageUrl("https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500")
                                .build());

                products.add(Product.builder()
                                .name("Sony WH-1000XM5")
                                .description("Industry-leading noise canceling headphones.")
                                .price(new BigDecimal("398.00"))
                                .stock(50)
                                .active(true)
                                .category("Electronics")
                                .imageUrl("https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500")
                                .build());

                products.add(Product.builder()
                                .name("iPhone 15 Pro Max")
                                .description("Titanium design, A17 Pro chip, 5x Telephoto camera.")
                                .price(new BigDecimal("1199.00"))
                                .stock(30)
                                .active(true)
                                .category("Electronics")
                                .imageUrl("https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=500")
                                .build());

                products.add(Product.builder()
                                .name("Samsung Galaxy S24 Ultra")
                                .description("AI-powered, S Pen included, Titanium frame.")
                                .price(new BigDecimal("1299.00"))
                                .stock(25)
                                .active(true)
                                .category("Electronics")
                                .imageUrl("https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500")
                                .build());

                products.add(Product.builder()
                                .name("PlayStation 5")
                                .description("Experience lightning fast loading with an ultra-high speed SSD.")
                                .price(new BigDecimal("499.99"))
                                .stock(10)
                                .active(true)
                                .category("Electronics")
                                .imageUrl("https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=500")
                                .build());

                products.add(Product.builder()
                                .name("Nintendo Switch OLED")
                                .description("7-inch OLED screen, wide adjustable stand.")
                                .price(new BigDecimal("349.99"))
                                .stock(40)
                                .active(true)
                                .category("Electronics")
                                .imageUrl("https://images.unsplash.com/photo-1593118247619-e2d6f056869e?w=500")
                                .build());

                products.add(Product.builder()
                                .name("Canon EOS R5")
                                .description("8K video, 45MP full-frame sensor.")
                                .price(new BigDecimal("3899.00"))
                                .stock(5)
                                .active(true)
                                .category("Electronics")
                                .imageUrl("https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500")
                                .build());

                products.add(Product.builder()
                                .name("GoPro Hero 12")
                                .description("Incredible image quality, even better HyperSmooth video stabilization.")
                                .price(new BigDecimal("399.99"))
                                .stock(60)
                                .active(true)
                                .category("Electronics")
                                .imageUrl("https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500")
                                .build());

                products.add(Product.builder()
                                .name("Keychron K2 Mechanical Keyboard")
                                .description("Wireless mechanical keyboard for Mac and Windows.")
                                .price(new BigDecimal("79.99"))
                                .stock(100)
                                .active(true)
                                .category("Electronics")
                                .imageUrl("https://images.unsplash.com/photo-1595225476474-87563907a212?w=500")
                                .build());

                // --- Fashion ---
                products.add(Product.builder()
                                .name("Classic White Tee")
                                .description("100% Cotton, regular fit, pre-shrunk.")
                                .price(new BigDecimal("19.99"))
                                .stock(200)
                                .active(true)
                                .category("Fashion")
                                .imageUrl("https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500")
                                .build());

                products.add(Product.builder()
                                .name("Slim Fit Jeans")
                                .description("Dark wash, stretch denim, comfortable fit.")
                                .price(new BigDecimal("49.99"))
                                .stock(120)
                                .active(true)
                                .category("Fashion")
                                .imageUrl("https://images.unsplash.com/photo-1542272617-08f0863200ed?w=500")
                                .build());

                products.add(Product.builder()
                                .name("Leather Jacket")
                                .description("Genuine leather, vintage style biker jacket.")
                                .price(new BigDecimal("199.99"))
                                .stock(15)
                                .active(true)
                                .category("Fashion")
                                .imageUrl("https://images.unsplash.com/photo-1551028919-38f3f87b3ddb?w=500")
                                .build());

                products.add(Product.builder()
                                .name("Nike Air Force 1")
                                .description("Classic white sneakers, timeless design.")
                                .price(new BigDecimal("110.00"))
                                .stock(45)
                                .active(true)
                                .category("Fashion")
                                .imageUrl("https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500")
                                .build());

                products.add(Product.builder()
                                .name("Adidas Ultraboost")
                                .description("Responsive boost midsole, primeknit upper.")
                                .price(new BigDecimal("180.00"))
                                .stock(35)
                                .active(true)
                                .category("Fashion")
                                .imageUrl("https://images.unsplash.com/photo-1587563871167-1ee9c731aef4?w=500")
                                .build());

                products.add(Product.builder()
                                .name("Ray-Ban Aviator")
                                .description("Classic gold frame with green lenses.")
                                .price(new BigDecimal("160.00"))
                                .stock(60)
                                .active(true)
                                .category("Fashion")
                                .imageUrl("https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500")
                                .build());

                products.add(Product.builder()
                                .name("Fossil Gen 6 Smartwatch")
                                .description("Wear OS by Google, stainless steel.")
                                .price(new BigDecimal("299.00"))
                                .stock(25)
                                .active(true)
                                .category("Fashion")
                                .imageUrl("https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500")
                                .build());

                products.add(Product.builder()
                                .name("North Face Puffer Jacket")
                                .description("Warm, insulated jacket for winter.")
                                .price(new BigDecimal("280.00"))
                                .stock(20)
                                .active(true)
                                .category("Fashion")
                                .imageUrl("https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=500")
                                .build());

                products.add(Product.builder()
                                .name("Canvas Backpack")
                                .description("Durable laptop backpack with multiple compartments.")
                                .price(new BigDecimal("45.99"))
                                .stock(80)
                                .active(true)
                                .category("Fashion")
                                .imageUrl("https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500")
                                .build());

                products.add(Product.builder()
                                .name("Silk Scarf")
                                .description("100% Silk, floral print, elegant design.")
                                .price(new BigDecimal("35.00"))
                                .stock(40)
                                .active(true)
                                .category("Fashion")
                                .imageUrl("https://images.unsplash.com/photo-1584030373081-f37b7bb4fa43?w=500")
                                .build());

                // --- Home & Kitchen ---
                products.add(Product.builder()
                                .name("Eames Lounge Chair")
                                .description("Mid-century modern replica, genuine leather.")
                                .price(new BigDecimal("899.99"))
                                .stock(5)
                                .active(true)
                                .category("Home & Kitchen")
                                .imageUrl("https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500")
                                .build());

                products.add(Product.builder()
                                .name("Dyson V15 Detect")
                                .description("Powerful cordless vacuum with laser reveal.")
                                .price(new BigDecimal("749.99"))
                                .stock(15)
                                .active(true)
                                .category("Home & Kitchen")
                                .imageUrl("https://images.unsplash.com/photo-1558317374-a35c20207184?w=500")
                                .build());

                products.add(Product.builder()
                                .name("Nespresso Vertuo")
                                .description("Coffee and espresso machine, one touch brewing.")
                                .price(new BigDecimal("199.00"))
                                .stock(40)
                                .active(true)
                                .category("Home & Kitchen")
                                .imageUrl("https://images.unsplash.com/photo-1517080315809-1fa320646c07?w=500")
                                .build());

                products.add(Product.builder()
                                .name("KitchenAid Stand Mixer")
                                .description("5-quart tilt-head mixer, artisan series.")
                                .price(new BigDecimal("449.99"))
                                .stock(10)
                                .active(true)
                                .category("Home & Kitchen")
                                .imageUrl("https://images.unsplash.com/photo-1594385208974-2e75f8d7bb48?w=500")
                                .build());

                products.add(Product.builder()
                                .name("Memory Foam Mattress")
                                .description("Queen size, 12-inch cooling gel foam.")
                                .price(new BigDecimal("399.00"))
                                .stock(10)
                                .active(true)
                                .category("Home & Kitchen")
                                .imageUrl("https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500")
                                .build());

                products.add(Product.builder()
                                .name("Indoor Potted Plant")
                                .description("Monstera Deliciosa, easy to care for.")
                                .price(new BigDecimal("29.99"))
                                .stock(50)
                                .active(true)
                                .category("Home & Kitchen")
                                .imageUrl("https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=500")
                                .build());

                products.add(Product.builder()
                                .name("Ceramic Dinner Set")
                                .description("16-piece set, matte black finish.")
                                .price(new BigDecimal("69.99"))
                                .stock(30)
                                .active(true)
                                .category("Home & Kitchen")
                                .imageUrl("https://images.unsplash.com/photo-1620706857370-e1b9fb9044b9?w=500")
                                .build());

                products.add(Product.builder()
                                .name("Table Lamp")
                                .description("Modern industrial design, brass finish.")
                                .price(new BigDecimal("49.99"))
                                .stock(45)
                                .active(true)
                                .category("Home & Kitchen")
                                .imageUrl("https://images.unsplash.com/photo-1513506003011-3b03c8b82456?w=500")
                                .build());

                // --- Sports ---
                products.add(Product.builder()
                                .name("Yoga Mat")
                                .description("Non-slip, eco-friendly TPE material.")
                                .price(new BigDecimal("25.00"))
                                .stock(100)
                                .active(true)
                                .category("Sports")
                                .imageUrl("https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500")
                                .build());

                products.add(Product.builder()
                                .name("Dumbbell Set")
                                .description("Adjustable dumbbells, 5-52 lbs.")
                                .price(new BigDecimal("299.00"))
                                .stock(20)
                                .active(true)
                                .category("Sports")
                                .imageUrl("https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500")
                                .build());

                products.add(Product.builder()
                                .name("Running Shoes")
                                .description("Lightweight, breathable, high cushioning.")
                                .price(new BigDecimal("89.99"))
                                .stock(60)
                                .active(true)
                                .category("Sports")
                                .imageUrl("https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500")
                                .build());

                products.add(Product.builder()
                                .name("Tennis Racket")
                                .description("Pro staff precision, graphite composite.")
                                .price(new BigDecimal("129.99"))
                                .stock(25)
                                .active(true)
                                .category("Sports")
                                .imageUrl("https://images.unsplash.com/photo-1617083208726-0e30d1cb7d55?w=500")
                                .build());

                products.add(Product.builder()
                                .name("Mountain Bike")
                                .description("Full suspension, 29-inch wheels.")
                                .price(new BigDecimal("799.00"))
                                .stock(8)
                                .active(true)
                                .category("Sports")
                                .imageUrl("https://images.unsplash.com/photo-1532298229144-0ec0c57e3ecc?w=500")
                                .build());

                products.add(Product.builder()
                                .name("Basketball")
                                .description("Official size and weight, superior grip.")
                                .price(new BigDecimal("29.99"))
                                .stock(80)
                                .active(true)
                                .category("Sports")
                                .imageUrl("https://images.unsplash.com/photo-1519861531473-92002639313a?w=500")
                                .build());

                // --- Books ---
                products.add(Product.builder()
                                .name("Clean Code")
                                .description("A Handbook of Agile Software Craftsmanship.")
                                .price(new BigDecimal("45.00"))
                                .stock(50)
                                .active(true)
                                .category("Books")
                                .imageUrl("https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500")
                                .build());

                products.add(Product.builder()
                                .name("The Pragmatic Programmer")
                                .description("Your Journey to Mastery. 20th Anniversary Edition.")
                                .price(new BigDecimal("39.99"))
                                .stock(40)
                                .active(true)
                                .category("Books")
                                .imageUrl("https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=500")
                                .build());

                products.add(Product.builder()
                                .name("Design Patterns")
                                .description("Elements of Reusable Object-Oriented Software.")
                                .price(new BigDecimal("54.99"))
                                .stock(30)
                                .active(true)
                                .category("Books")
                                .imageUrl("https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500")
                                .build());

                products.add(Product.builder()
                                .name("Introduction to Algorithms")
                                .description("The bible of algorithms. 4th Edition.")
                                .price(new BigDecimal("95.00"))
                                .stock(20)
                                .active(true)
                                .category("Books")
                                .imageUrl("https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500")
                                .build());

                products.add(Product.builder()
                                .name("Atomic Habits")
                                .description("An Easy & Proven Way to Build Good Habits & Break Bad Ones.")
                                .price(new BigDecimal("16.99"))
                                .stock(100)
                                .active(true)
                                .category("Books")
                                .imageUrl("https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500")
                                .build());

                products.add(Product.builder()
                                .name("Project Hail Mary")
                                .description("A sci-fi novel by Andy Weir.")
                                .price(new BigDecimal("14.99"))
                                .stock(60)
                                .active(true)
                                .category("Books")
                                .imageUrl("https://images.unsplash.com/photo-1614544048536-0d28caf77f41?w=500")
                                .build());

                // --- Beauty ---
                products.add(Product.builder()
                                .name("Face Moisturizer")
                                .description("Hydrating daily lotion with SPF 30.")
                                .price(new BigDecimal("22.00"))
                                .stock(80)
                                .active(true)
                                .category("Beauty")
                                .imageUrl("https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=500")
                                .build());

                products.add(Product.builder()
                                .name("Vitamin C Serum")
                                .description("Brightening serum for all skin types.")
                                .price(new BigDecimal("35.00"))
                                .stock(45)
                                .active(true)
                                .category("Beauty")
                                .imageUrl("https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500")
                                .build());

                products.add(Product.builder()
                                .name("Matte Lipstick")
                                .description("Long-lasting wear, ruby red.")
                                .price(new BigDecimal("18.00"))
                                .stock(100)
                                .active(true)
                                .category("Beauty")
                                .imageUrl("https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500")
                                .build());

                products.add(Product.builder()
                                .name("Perfume No. 5")
                                .description("Classic floral fragrance, 50ml.")
                                .price(new BigDecimal("95.00"))
                                .stock(30)
                                .active(true)
                                .category("Beauty")
                                .imageUrl("https://images.unsplash.com/photo-1541643600914-78b084683601?w=500")
                                .build());

                products.add(Product.builder()
                                .name("Bose QuietComfort 45")
                                .description("Wireless noise cancelling headphones.")
                                .price(new BigDecimal("329.00"))
                                .stock(40)
                                .active(true)
                                .category("Electronics")
                                .imageUrl("https://images.unsplash.com/photo-1546435770-a3e2feadf728?w=500")
                                .build());

                products.add(Product.builder()
                                .name("Sonos One Gen 2")
                                .description("Powerful smart speaker with voice control built-in.")
                                .price(new BigDecimal("219.00"))
                                .stock(25)
                                .active(true)
                                .category("Electronics")
                                .imageUrl("https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=500")
                                .build());

                return products;
        }
}
