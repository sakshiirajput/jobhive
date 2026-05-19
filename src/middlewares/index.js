import axios from 'axios';
export const imageUpload = async (e) => {
  try {
    const selectedFile = e.target.files[0];
    const data = new FormData();
    data.append("file", selectedFile);
    data.append("upload_preset", "amanpanchal");
    data.append("cloud_name", "dk2scs5jz");
    const fileName = selectedFile.name;
    const fileExtension = fileName?.split(".").pop().toLowerCase();

    if (["jpg", "jpeg", "png", "gif", "bmp"].includes(fileExtension)) {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dk2scs5jz/image/upload",
        data
      );

      const image = {
        public_id: res?.data?.public_id,
        url: res?.data?.url,
      };

      return { success: true, data: image };
    } else if (
      ["mp4", "avi", "mov", "mkv", "wmv", "webm"].includes(fileExtension)
    ) {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dk2scs5jz/video/upload",
        data
      );


      const image = {
        public_id: res?.data?.public_id,
        url: res?.data?.url,
      };

      return { success: true, data: image };
    }
  } catch (error) {
    console.error(error);
    return { success: false, error: error.message };
  }
};
