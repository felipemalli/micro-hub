-- Create database if it doesn't exist
CREATE DATABASE micro_hub_dev;

-- Connect to the database
\c micro_hub_dev;

-- Create extensions if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- You can add initial data here if needed
-- Example:
-- INSERT INTO users (id, email, firstName, lastName, password, role) 
-- VALUES (uuid_generate_v4(), 'admin@example.com', 'Admin', 'User', '$2b$12$hashedpassword', 'admin');
```

```
