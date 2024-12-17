export async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delayMs: number = 1000
): Promise<T> {
  let retryCount = 0;

  while (true) {
    try {
      return await operation();
    } catch (error) {
      if (retryCount >= maxRetries) {
        throw error;
      }

      retryCount++;
      console.log(`Retry attempt ${retryCount}/${maxRetries}...`);
      await new Promise(resolve => setTimeout(resolve, delayMs * retryCount));
    }
  }
}