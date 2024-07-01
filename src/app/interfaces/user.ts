export interface User {
  id: number;
  username: string;
  password: string;
  date_added?: Date;
  last_updated: Date;
  uuid: string;
  failed_login_attempts: number;
  is_2fa_configured: number;
}
