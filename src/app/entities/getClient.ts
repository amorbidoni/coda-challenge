export interface GetClientInterface {
  success: boolean;
  response: Response;
}

export interface Response {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  address: string;
  photo: string;
  caption: string;
  created_at: Date | string;
  updated_at: Date | string;
  deleted: number;
}
