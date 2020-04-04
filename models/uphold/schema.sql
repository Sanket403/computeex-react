DROP TABLE users;
DROP TABLE transfers;

CREATE TABLE users (
  -- UUID compliant with RFC 4122
  userId BINARY(16) PRIMARY KEY NOT NULL,
  -- JSON Stringified uphold user object
  upholdUserObject TEXT,
  -- wallet address of the user
  walletAddress BINARY(20) NOT NULL,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);

CREATE TABLE transfers (
  -- UUID compliant with RFC 4122
  transactionId BINARY(16) PRIMARY KEY NOT NULL,
  -- UUID compliant with RFC 4122
  userId BINARY(16) UNIQUE NOT NULL,
  btcAmount FLOAT,
  -- esAmount is 32 bytes
  esAmount BINARY(32),
  status ENUM('pending', 'processed'),
  txHash BINARY(32),
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW(),
  INDEX(userId, status)
);