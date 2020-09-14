import { NowRequest } from '@vercel/node';

export interface User {
  id: number;
  username: string;
  password: string;
}

export type AuthenticatedRequest = NowRequest & { user: User };
