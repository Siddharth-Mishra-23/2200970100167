const logger = {
  log: (message, data) => {
    console.log(`[LOG] ${message}`, data);
  },
  error: (message, error) => {
    console.error(`[ERROR] ${message}`, error);
  }
};

export default logger;