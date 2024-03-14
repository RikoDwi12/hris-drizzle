
const {
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME
} = process.env
export const generateConnectionString = (env?: any) => {
  if (!env) return `postgresql://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?schema=public`
  else {
    const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = env
    return `postgresql://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?schema=public`
  }
}
