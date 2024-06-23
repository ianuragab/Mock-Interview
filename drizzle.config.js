/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./utils/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://mockdb_owner:Z9zQua2pxmPR@ep-odd-king-a55wjyea.us-east-2.aws.neon.tech/mockdb?sslmode=require",
  },
};
