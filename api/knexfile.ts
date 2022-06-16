// Update with your config settings.

const HOST = process.env.DATABASE_HOST || "127.0.0.1";
const USER = process.env.POSTGRES_USER || "postgres";
const PASSWORD = process.env.POSTGRES_PASSWORD || "docker";
const DATABASE = process.env.POSTGRES_DB || "iris";
const DATABASE_PORT = process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT) : 5432;

type config = {
  client: string,
  connection: {
    host: string,
    user: string,
    password: string,
    port: number,
    database: string,
  },
  migrations: {
    directory: string,
    extension: string
  },
  pool: {
    min: number,
    max: number,
  },
  seeds: {
    directory: string,
    extension: string
  },
};

const config: config = {
    client: "postgresql",
    connection: {
      host: HOST,
      user: USER,
      password: PASSWORD,
      port: DATABASE_PORT,
      database: DATABASE,
    },
    migrations: {
      directory: "./db/migrations",
      extension: 'ts'
    },
    pool: {
      min: 2,
      max: 10,
    },
    seeds: {
      directory: "./db/seeds",
      extension: 'ts'
    }
};

const testConfig: config = {
  client: "postgresql",
  connection: {
    host: HOST,
    user: "test",
    password: "test",
    port: DATABASE_PORT,
    database: "test",
  },
  migrations: {
    directory: "./db/test/migrations",
    extension: 'ts'
  },
  pool: {
    min: 2,
    max: 10,
  },
  seeds: {
    directory: "./db/test/seeds",
    extension: 'ts'
  }
};

export const knexConfig = process.env.NODE_ENV === 'test' ? testConfig : testConfig;