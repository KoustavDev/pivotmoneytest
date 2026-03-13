/**
 * User Serializer *
 * @param {Object} bseBody - The successful body from simulateBSECall()
 * @returns {{ success: boolean, userId: string, message: string }}
 */
const serializeSignupResponse = (bseBody) => {
  return {
    success: true,
    userId: bseBody.id,
    message: bseBody.message,
  };
};

export { serializeSignupResponse };
