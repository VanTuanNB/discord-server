console.log('env', Bun.env.VERSION);

export const APP_PATH = `/api/${Bun.env.VERSION || 'v1'}`;
