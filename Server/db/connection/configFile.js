import dotenv from 'dotenv';
dotenv.config();

const config = {};

config.development = {
  connectionString: process.env.DEV_DATABASE_URL,
};
config.test = {
  connectionString: process.env.TEST_DATABASE_URL,
}

config.production = {
  connectionString: process.env.DATABASE_URL,
}

export default config;