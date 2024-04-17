


-- @block
CREATE TABLE Users(
    email VARCHAR(255) NOT NULL UNIQUE,
    pw VARCHAR(255),
    userName VARCHAR(255)
);