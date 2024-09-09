export const getItemsInCartFunctionDeclaration = {
  name: "getItemsInCart",
  parameters: {
    type: "object",
    description: "Retrieve all items in the cart for a specific user.",
    properties: {
      userId: {
        type: "number",
        description: "The ID of the user whose cart items are being retrieved.",
      },
    },
    required: ["userId"],
  },
};
