CREATE TABLE smart_watches_sales(
    sales_id SERIAL PRIMARY KEY,
    brand VARCHAR(50),
    model VARCHAR(100),
    city VARCHAR(100),
    units_sold INT,
    price_per_unit DECIMAL(10, 2),
    sale_date DATE
);
--
--
INSERT INTO smart_watches_sales(
        brand,
        model,
        city,
        units_sold,
        price_per_unit,
        sale_date
    )
VALUES (
        'Apple',
        'Watch Series 9',
        'Bangalore',
        50,
        45000.00,
        '2026-04-01'
    ),
    (
        'Samsung',
        'Galaxy Watch 6',
        'Hyderabad',
        40,
        30000.00,
        '2026-04-02'
    ),
    (
        'Noise',
        'ColorFit Pro 5',
        'Delhi',
        70,
        5000.00,
        '2026-04-03'
    ),
    (
        'Boat',
        'Xtend Pro',
        'Mumbai',
        60,
        4000.00,
        '2026-04-04'
    ),
    (
        'Fire-Boltt',
        'Ninja Call Pro',
        'Pune',
        80,
        3500.00,
        '2026-04-05'
    ),
    (
        'Apple',
        'Watch SE',
        'Chennai',
        30,
        30000.00,
        '2026-04-06'
    ),
    (
        'Samsung',
        'Galaxy Watch 5',
        'Bangalore',
        25,
        28000.00,
        '2026-04-07'
    ),
    (
        'Noise',
        'Evolve 3',
        'Hyderabad',
        55,
        4500.00,
        '2026-04-08'
    ),
    (
        'Boat',
        'Storm Pro',
        'Delhi',
        65,
        3500.00,
        '2026-04-09'
    ),
    (
        'Fire-Boltt',
        'Invincible Plus',
        'Mumbai',
        45,
        6000.00,
        '2026-04-10'
    ),
    (
        'Apple',
        'Watch Ultra',
        'Pune',
        20,
        85000.00,
        '2026-04-11'
    ),
    (
        'Samsung',
        'Galaxy Watch 4',
        'Chennai',
        35,
        20000.00,
        '2026-04-12'
    ),
    (
        'Noise',
        'Pulse 2 Max',
        'Bangalore',
        75,
        3000.00,
        '2026-04-13'
    ),
    (
        'Boat',
        'Wave Call',
        'Hyderabad',
        50,
        2500.00,
        '2026-04-14'
    ),
    (
        'Fire-Boltt',
        'Ring Pro',
        'Delhi',
        60,
        4000.00,
        '2026-04-15'
    ),
    (
        'Apple',
        'Watch Series 8',
        'Mumbai',
        28,
        42000.00,
        '2026-04-16'
    ),
    (
        'Samsung',
        'Galaxy Watch Active',
        'Pune',
        33,
        18000.00,
        '2026-04-17'
    ),
    (
        'Noise',
        'Fit Halo',
        'Chennai',
        68,
        3200.00,
        '2026-04-18'
    ),
    (
        'Boat',
        'Flash Edition',
        'Bangalore',
        72,
        2800.00,
        '2026-04-19'
    ),
    (
        'Fire-Boltt',
        'Phoenix Pro',
        'Hyderabad',
        58,
        3700.00,
        '2026-04-20'
    );
--
SELECT COUNT(*)
FROM smart_watches_sales;
--
--
SELECT SUM(units_sold * price_per_unit) AS total_revenue
from smart_watches_sales;
--
--
SELECT AVG(price_per_unit) AS avg_price_per_unit
FROM smart_watches_sales;
--
SELECT MIN(price_per_unit) AS cheapest
FROM smart_watches_sales;
SELECT MAX(price_per_unit) AS cheapest
FROM smart_watches_sales;
--
SELECT *
FROM smart_watches_sales;
--
--
--! GROUP BY
SELECT brand,
    SUM(units_sold) AS total_units_sold
from smart_watches_sales
GROUP BY brand
ORDER BY total_units_sold DESC;