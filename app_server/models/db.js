const mongoose = require('mongoose');
const readline = require('readline');

const host = process.env.DB_HOST || '127.0.0.1';
const dbURI = `mongodb://${host}/travlr`;

// Build the connection string and set the connection timeout.
const connect = () => {
  setTimeout(() => mongoose.connect(dbURI), 1000);
};

// Monitor MongoDB connection events.
mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on('error', (err) => {
  console.log('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// Windows-specific listener.
if (process.platform === 'win32') {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.on('SIGINT', () => {
    process.emit('SIGINT');
  });
}

// Configure graceful shutdown.
const gracefulShutdown = (message) => {
  mongoose.connection.close().then(() => {
    console.log(`Mongoose disconnected through ${message}`);
  });
};

// Shutdown invoked by nodemon restart.
process.once('SIGUSR2', () => {
  gracefulShutdown('nodemon restart');
  process.kill(process.pid, 'SIGUSR2');
});

// Shutdown invoked by application termination.
process.on('SIGINT', () => {
  gracefulShutdown('app termination');
  process.exit(0);
});

// Shutdown invoked by container termination.
process.on('SIGTERM', () => {
  gracefulShutdown('app shutdown');
  process.exit(0);
});

// Make the initial connection.
connect();

// Import the Mongoose schema.
require('./travlr');

module.exports = mongoose;