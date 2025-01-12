import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

// Load .env file only in development
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.REACT_APP_API_BASE_URL': JSON.stringify(process.env.REACT_APP_API_BASE_URL),
    'process.env.REACT_APP_WEBSOCKET_URL': JSON.stringify(process.env.REACT_APP_WEBSOCKET_URL)
  }
});
