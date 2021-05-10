export interface User {
  id?: number;
  auth0_user_id?: number;
  email?: string | null;
  first_name?: string;
  last_name?: string;
  full_name?: string;
  stripe_customer_id?: string;
  is_subscribed?: boolean;
}
