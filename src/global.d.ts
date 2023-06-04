declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production'
      APP_PORT: number
      APP_JWT_SECRET: string
      DATABASE_URL: string
    }
  }
}
export {};