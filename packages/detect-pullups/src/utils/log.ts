let logLevel = 2;

export const setLogLevel = (level: number) => (logLevel = level);

export const logInfo = (...rest: any) => {
  console.info(...rest);
};

export const logWarn = (...rest: any) => {
  console.warn(...rest);
};

export const logDebug = (...rest: any) => {
  if (logLevel > 2) {
    console.log(...rest);
  }
};
