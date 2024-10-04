// src/config/config.ts
interface Config {
  apiUrl: string;
}

const config: Config = Object.freeze({
  apiUrl: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
});

export default config;
