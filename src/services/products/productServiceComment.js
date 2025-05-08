import axios from "axios";

export const getProductComments = async (productId, page = 1, pageSize = 5) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products/${productId}/comments`,
      {
        params: {
          page,
          pageSize,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}; 