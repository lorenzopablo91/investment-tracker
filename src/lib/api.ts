export const API_CONFIG = {
    BINANCE: {
        BASE_URL: 'https://api.binance.com',
        API_KEY: process.env.BINANCE_API_KEY || '',
        SECRET_KEY: process.env.BINANCE_SECRET_KEY || '',
        REVALIDATE_TIME: 60
    }
};