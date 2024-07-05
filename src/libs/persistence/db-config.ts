import { registerAs } from '@nestjs/config';

export default registerAs('dbConfig', () => {
  const dbConfig = {
    db: {
      user: process.env.MONGODB_USER,
      password: process.env.MONGODB_PASSWORD,
      cluster: process.env.MONGODB_CLUSTER,
      name: process.env.MONGODB_DBNAME,
    },
    // env: process.env.NODE_ENV || 'local',
  };
  return dbConfig;
});
