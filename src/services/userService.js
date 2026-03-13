import { simulateApiCallDelay } from "../utils/apiCallDelaySimulator.js";
import { mapToBSEPayload } from "../utils/bseMapper.js";

/**
 * @param {Object} bsePayload - BSE-formatted request body
 * @returns {{ isError: boolean, statusCode: number, body: Object }}
 */
const simulateBSECall = async (bsePayload) => {
  // simulating api call delay
  await simulateApiCallDelay(1, 3);

  // Error simulation path
  if (bsePayload.test_error === true) {
    console.warn("[BSE Mock] ⚠️  test_error flag detected — returning 400.");
    return {
      isError: true,
      statusCode: 400,
      body: {
        success: false,
        status: "FAILED",
        errors: [
          {
            code: "BSE_ERR_001",
            field: "pan_no",
            message:
              "PAN already registered with BSE StAR MF. Use a different PAN.",
          },
          {
            code: "BSE_ERR_002",
            field: "email_id",
            message:
              "Email address is already associated with an existing account.",
          },
        ],
      },
    };
  }

  // Hardcoded success response
  const userId = `USR-${Date.now()}`;
  console.log(`[BSE Mock] ✅  Registration successful. userId=${userId}`);

  return {
    isError: false,
    statusCode: 201,
    body: {
      success: true,
      status: "SUCCESS",
      id: userId,
      message: "Client registered successfully with BSE StAR MF 2.0",
      bse_client_code: `BSE${Math.floor(100000 + Math.random() * 900000)}`,
    },
  };
};;

// ─── User Service 

class UserService {
  /**
   * @param {Object} validatedData - Output of signupSchema.parse()
   * @returns {Promise<{ isError: boolean, statusCode: number, body: Object }>}
   */
  async registerUser(validatedData) {
    // Transform using BSE Mapper
    const bsePayload = mapToBSEPayload(validatedData);

    // Call mock (replace with real axios call when ready)
    const bseResponse = await simulateBSECall(bsePayload);

    return bseResponse;
  }
}

export default UserService;
