export enum ApiMethodEnums {
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE",
  PATCH = "PATCH",
  PUT = "PUT",
}

export interface CallApiType<TPayload> {
  method?: ApiMethodEnums;
  data?: TPayload;
  url: string;
  params?: { [name: string]: string };
}

export interface ResponseInterface<Payload> {
  data: Payload;
  message: string;
}
