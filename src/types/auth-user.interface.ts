export interface AuthUser {
  user_id: number;
  user_refreshtoken?: string | null;
  user_nick: string;
}

export interface AuthRequest extends Request {
  user: AuthUser;
}
