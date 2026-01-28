// config/db.js
const { Pool } = require("pg");
const { POSTGRES_URI } = require("./config");

const pool = new Pool({
  connectionString: POSTGRES_URI,
});

const connectDB = async () => {
  try {
    const client = await pool.connect();
    console.log("✅ PostgreSQL Connected");
    client.release();
    return pool;
  } catch (error) {
    console.error(`❌ Database connection failed: ${error.message}`);
    throw error;
  }
};

module.exports = {
  connectDB,
  pool,
};
