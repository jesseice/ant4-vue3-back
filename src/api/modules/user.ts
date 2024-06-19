import axiosRequest from "../request";

/** 登录 */
export const login = async (data: { username: string; password: string }) => {
  return await axiosRequest({
    method: "POST",
    url: "*****",
    data,
  });
};
