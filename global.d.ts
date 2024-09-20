declare global {
  namespace NodeJS {
    interface ProcessEnv {
      RAPID_API_KEY: string;
    }
  }
}

export {};
