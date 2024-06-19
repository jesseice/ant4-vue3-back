import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
// import { MessagePlugin, NotifyPlugin } from 'tdesign-vue-next';
import { getUserStore } from "@/store";
import { message, notification } from "ant-design-vue";

interface AxiosConfig extends AxiosRequestConfig {
  method?: "GET" | "POST" | "DELETE" | "PUT";
  url: string;
  params?: Record<string, any>;
  data?: Record<string, any>;
  config?: Record<string, string>;
}

const codeMessage: Record<number, string> = {
  200: "服务器成功返回请求的数据。",
  201: "新建或修改数据成功。",
  202: "一个请求已经进入后台排队（异步任务）。",
  204: "删除数据成功。",
  400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
  401: "用户没有权限（令牌、用户名、密码错误）。",
  403: "用户得到授权，但是访问是被禁止的。",
  404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
  406: "请求的格式不可得。",
  410: "请求的资源被永久删除，且不会再得到的。",
  422: "当创建一个对象时，发生一个验证错误。",
  500: "服务器发生错误，请检查服务器。",
  502: "网关错误。",
  503: "服务不可用，服务器暂时过载或维护。",
  504: "网关超时。",
};

const notificationBox = (status: number, url: string, errorText: string) => {
  return notification.error({
    message: errorText,
    description: `请求错误 ${status}: ${url}`,
  });
};

// 请求错误
const requestInterceptorsError = (error: any) => Promise.reject(error);

// 响应数据
const responseInterceptors = (response: AxiosResponse) => {
  if (response && response.status === 200) {
    const { code } = response.data;
    if (code === -999) {
      message.info("登录过期, 即将跳转登录页面");
      const timer = setTimeout(() => {
        getUserStore().logout();
        clearTimeout(timer);
      }, 2000);
      return null;
    }
    return response.data;
  }
  return response.data;
};
// 响应错误
const responseInterceptorsError = (error: any) => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status } = response;
    const url = response.request.responseURL;

    if (response.status !== 400 && response.status !== 401) {
      notificationBox(status, url, errorText);
    }
    switch (status) {
      case 401:
        notificationBox(status, url, errorText);
        // TODO
        break;
      case 403:
        // TODO
        break;
      default:
        break;
    }
  } else {
    notification.error({
      message: "网络异常",
      description: "您的网络发生异常，无法连接服务器",
    });
  }
  return Promise.reject(error);
};
/** 不能token的接口 */
const noTokenList = ["/login"];

const createAxiosByInterceptors = (
  config?: AxiosRequestConfig
): AxiosInstance => {
  const instance = axios.create({
    // TODO
    baseURL: "/api",
    timeout: 60000,
    headers: {
      "Content-Type": "application/json",
    },
    ...config,
  });

  // 请求拦截器
  instance.interceptors.request.use((config) => {
    const { token } = getUserStore();
    // 如果有 token 强制带上 token
    if (token && config.url && !noTokenList.includes(config.url))
      config.headers.Authorization = token;
    return config;
  }, requestInterceptorsError);
  // 响应拦截器
  instance.interceptors.response.use(
    responseInterceptors,
    responseInterceptorsError
  );
  return instance;
};

const axiosRequest = <T>(axiosParams: AxiosConfig): Promise<T | null> => {
  const { method = "GET", url, params, data, config } = axiosParams;
  const request = createAxiosByInterceptors(axiosParams);

  switch (method) {
    case "GET":
      return request.get(url, { ...params, ...config });
    case "POST":
      return request.post(url, data, config);
    case "DELETE":
      return request.delete(url, { ...data, ...config });
    case "PUT":
      return request.put(url, { ...data, ...config });
    default:
      // 需要添加错误请求
      return Promise.resolve(null);
  }
};

export default axiosRequest;
