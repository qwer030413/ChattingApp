-- @block
CREATE TABLE users(
    email VARCHAR(255) NOT NULL UNIQUE,
    pw VARCHAR(255),
    username VARCHAR(255)
);
