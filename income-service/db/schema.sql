-- username: finance_dude
-- password: finance_dude

DROP TABLE IF EXISTS income;

-- Create income table
CREATE TABLE income (
    id SERIAL PRIMARY KEY,
    amount NUMERIC(10, 2) NOT NULL,
    source VARCHAR(255) NOT NULL,
    date DATE NOT NULL
);

-- Insert some sample data (optional)
INSERT INTO income (amount, source, date)
VALUES 
    (1500.00, 'Freelance Project', '2024-11-01'),
    (2000.00, 'Part-time Job', '2024-10-15');