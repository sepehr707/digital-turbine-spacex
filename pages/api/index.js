import axios from "axios";

export const getLaunchData = async (url, options) => {
  return await axios.post(url, {
    options,
  });
};
