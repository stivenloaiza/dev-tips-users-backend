import { registerAs } from '@nestjs/config';
import { env } from 'process';

export default registerAs('dbConfig', () => {
  const dbConfig = {
    db: {
      user: process.env.MONGODB_USER,
      password: process.env.MONGODB_PASSWORD,
      cluster: process.env.MONGODB_CLUSTER,
      name: process.env.MONGODB_DBNAME,
    },
  };
  return dbConfig;
});
