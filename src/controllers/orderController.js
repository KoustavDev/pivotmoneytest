import OrderService from "../services/orderService.js";
import { serializeOrderEntryResponse } from "../serializers/orderSerializer.js";
import { orderEntrySchema } from "../validation/types.js";
import { asyncHandler } from "../middlewares/errorHandler.js";

class OrderController {
  constructor() {
    this.orderService = new OrderService();
  }

  // POST /api/order/entry
  entry = asyncHandler(async (req, res) => {
    // Validation using Zod schema
    const validatedData = orderEntrySchema.parse(req.body);

    // Call service
    const bseResult = await this.orderService.createOrder(validatedData);

    // Serialize response
    const response = serializeOrderEntryResponse(bseResult.body);

    return res.status(bseResult.statusCode).json(response);
  });
}

export default OrderController;
