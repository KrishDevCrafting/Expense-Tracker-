import axios from "axios";
import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axios";

const uploadImage = async (imageFile) => {
  const formData = new FormData();

  // Append image file to form data
  formData.append("image", imageFile);
  try {
    const response = await axiosInstance.post(
      API_PATHS.IMAGE.UPLOAD_IMAGE,
      formData,
      {
        header: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
    // return Response data
  } catch (error) {
    console.error("error uploading the image", error);
    throw error;
    // Rethrow error for headling
  }
};

export default uploadImage;
