/**
 * Order Serializer 
 * @param {Object} bseBody - The body from executeBSEOrder()
 * @returns { success: boolean, orderId: string|null, message: string }
 */
const serializeOrderEntryResponse = (bseBody) => {
  if (bseBody.status === "SUCCESS") {
    return {
      success: true,
      orderId: bseBody.order_id,
      message: bseBody.remarks,
    };
  }

  return {
    success: false,
    orderId: null,
    message: bseBody.error_msg,
  };
};

export { serializeOrderEntryResponse };
