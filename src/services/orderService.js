import { randomUUID } from "crypto";
import { mapToBSEOrderPayload } from "../utils/bseMapper.js";
import { simulateApiCallDelay } from "../utils/apiCallDelaySimulator.js";

const executeBSEOrder = async (payload) => {
  // simulating api call delay
  await simulateApiCallDelay(1, 3);
  
  // Simulate BSE error response based on buy_val
  if (Number(payload.buy_val) < 500) {
    return {
      statusCode: 400,
      body: {
        status: "FAILURE",
        error_msg: "Minimum amount for this scheme is 500",
      },
    };
  }

  // Simulate success response
  return {
    statusCode: 200,
    body: {
      status: "SUCCESS",
      order_id: "BSE998877",
      remarks: "Order accepted",
    },
  };
};

class OrderService {
  async createOrder(validatedData) {
    // Generate a unique client_ref_no for this order entry
    const clientRefNo = `TXN-${randomUUID()}`;
    console.log(`[Order Entry] client_ref_no=${clientRefNo}`);

    // Map frontend payload to BSE format
    const bsePayload = mapToBSEOrderPayload(validatedData, clientRefNo);

    // Simulate BSE API call with the mapped payload
    return executeBSEOrder(bsePayload);
  }
}

export default OrderService;
