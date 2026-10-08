export interface ErrorResponse {
  error: {
    origin: string;
    code: string;
    format?: string;
    pattern?: string;
    path: string[];
    message: string;
  };
}