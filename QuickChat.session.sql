-- @block
CREATE TABLE users(
    email VARCHAR(255) NOT NULL UNIQUE,
    pw VARCHAR(255),
    username VARCHAR(255)
);
-- @block
CREATE TABLE Friends(
    email VARCHAR(255) NOT NULL UNIQUE,
    username VARCHAR(255)
);

-- @block
ALTER TABLE friends
ADD COLUMN myEmail data_type [constraint];