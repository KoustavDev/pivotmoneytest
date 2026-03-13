/**
 * Simulates an API/network delay for a random number of seconds.
 * @param {number} minSeconds - Minimum delay in seconds (inclusive)
 * @param {number} maxSeconds - Maximum delay in seconds (inclusive)
 * @returns {Promise<number>} Resolved random delay in seconds
 */
const simulateApiCallDelay = async (minSeconds = 1, maxSeconds = 3) => {
  if (minSeconds < 0 || maxSeconds < 0) {
    throw new Error("minSeconds and maxSeconds must be non-negative");
  }

  if (minSeconds > maxSeconds) {
    throw new Error("minSeconds cannot be greater than maxSeconds");
  }

  const minMs = Math.floor(minSeconds * 1000);
  const maxMs = Math.floor(maxSeconds * 1000);
  const randomMs = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;

  await new Promise((resolve) => setTimeout(resolve, randomMs));

  return randomMs / 1000;
};

export { simulateApiCallDelay };
