import UserService from "../services/userService.js";
import { serializeSignupResponse } from "../serializers/userSerializer.js";
import { signupSchema } from "../validation/types.js";
import { asyncHandler } from "../middlewares/errorHandler.js";

class UserController {
  constructor() {
    this.userService = new UserService();
  }

  // POST /api/user/signup
  signup = asyncHandler(async (req, res) => {
    // Validation using Zod schema
    const validatedData = signupSchema.parse(req.body);

    // Call service
    const bseResult = await this.userService.registerUser(validatedData);

    // Handle BSE error response
    if (bseResult.isError) {
      return res.status(bseResult.statusCode).json(bseResult.body);
    }

    // Serialize and return success
    const response = serializeSignupResponse(bseResult.body);
    return res.status(201).json(response);
  });
}

export default UserController;
