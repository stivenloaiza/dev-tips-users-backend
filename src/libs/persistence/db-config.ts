import { registerAs } from '@nestjs/config';
import { env } from 'process';

export default registerAs('dbConfig', () => {
  const dbConfig = {
    db: {
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      cluster: process.env.DB_CLUSTER,
      name: process.env.DB_DBNAME,
      localUri: process.env.DB_LOCAL_CONNECTION,
      env: process.env.NODE_ENV || 'development'

    },
    // env: process.env.NODE_ENV || 'local',
  };
  return dbConfig;
});
