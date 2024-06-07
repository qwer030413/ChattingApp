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
ADD COLUMN myEmail VARCHAR(255);

-- @block
CREATE TABLE friendReq(
    fromEmail VARCHAR(255) NOT NULL,
    toEmail VARCHAR(255) NOT NULL
);
-- @block
TRUNCATE TABLE friends;

-- @block
ALTER TABLE friends  DROP COLUMN username;

-- @block
ALTER TABLE users ADD COLUMN id VARCHAR(255);