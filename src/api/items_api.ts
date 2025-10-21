import { CATALOG_API } from "@/constants/variables";
import { ApiResponse, ItemSchema } from "@/lib/types";
import axios, { AxiosError } from "axios";

const handleApiError = (error: unknown): ApiResponse<ItemSchema[] | null> => {
  console.log("Main Error:", error);
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      // Server responded with a status code outside 2xx
      return {
        status: "error",
        success: false,
        errors: (axiosError.response.data as { errors: string })?.errors || "",
        error:
          (axiosError.response.data as { error: string })?.error ||
          "Server error occurred",
        message:
          (axiosError.response.data as { message: string })?.message ||
          "Server error occurred",
        data: null,
      };
    } else if (axiosError.request) {
      // Request was made but no response received
      return {
        status: "error",
        success: false,
        errors: "",
        error: "Network error - no response from server",
        message: "Network error - no response from server",
        data: null,
      };
    }
  }
  // Unknown error
  return {
    status: "error",
    success: false,
    errors: "",
    error: "An unknown error occurred",
    message: "An unknown error occurred",
    data: null,
  };
};

export const GetItems = async (item_type: string) => {
  try {
    const response = await axios.get(`${CATALOG_API}/item/public/get-all`, {
      params: { item_type },
    });
    return response.data;
  } catch (err) {
    handleApiError(err);
  }
};
