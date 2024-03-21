/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// index.ts
import { message } from "antd";
import axios from "axios";
import { RequestChat_URL } from ".";

import type {
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";

// 导出Request类，可以用来自定义传递配置来创建实例
export class Request {
  // axios 实例
  instance: AxiosInstance;
  // 基础配置，url和超时时间
  baseConfig: AxiosRequestConfig = {
    baseURL: RequestChat_URL,
    timeout: 60000,
  };

  constructor(config: AxiosRequestConfig) {
    // 使用axios.create创建axios实例
    this.instance = axios.create(Object.assign(this.baseConfig, config));

    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig<any>) => {
        // 一般会请求拦截里面加token，用于后端的验证
        const token = localStorage.getItem("token");
        if (token) {
          config.headers!.Authorization = token;
        }
        return config;
      },
      (err: any) => {
        // 请求错误，这里可以用全局提示框进行提示
        return Promise.reject(err);
      }
    );

    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        // 直接返回res，当然你也可以只返回res.data
        // 系统如果有自定义code也可以在这里处理
        return res;
      },
      (err: any) => {
        // 这里用来处理http常见错误，进行全局提示
        let msg = "";
        switch (err.response.status) {
          case 400:
            msg = err.response.data.msg;
            break;
          case 401:
            msg = "未授权，请重新登录(401)";
            // 这里可以做清空storage并跳转到登录页的操作
            window.location.href = "/login";
            break;
          case 403:
            msg = "拒绝访问(403)";
            break;
          case 404:
            msg = "请求出错(404)";
            break;
          case 408:
            msg = "请求超时(408)";
            break;
          case 500:
            msg = "服务器错误(500)";
            break;
          case 501:
            msg = "服务未实现(501)";
            break;
          case 502:
            msg = "网络错误(502)";
            break;
          case 503:
            msg = "服务不可用(503)";
            break;
          case 504:
            msg = "网络超时(504)";
            break;
          case 505:
            msg = "HTTP版本不受支持(505)";
            break;
          default:
            msg = `连接出错(${err.response.status})!`;
        }
        message.error(msg);
        // alert(msg)
        // 这里错误消息可以使用全局弹框展示出来
        // 比如element plus 可以使用 ElMessage
        // ElMessage({
        //   showClose: true,
        //   message: `${message}，请检查网络或联系管理员！`,
        //   type: "error",
        // });
        // 这里是AxiosError类型，所以一般我们只reject我们需要的响应即可
        return Promise.reject(err.response);
      }
    );
  }

  // 定义请求方法
  public request(config: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.instance.request(config);
  }

  public get<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.get(url, config);
  }

  public post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.post(url, data, config);
  }

  public put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.put(url, data, config);
  }

  public delete<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.delete(url, config);
  }
}

// 默认导出Request实例
export default new Request({});
