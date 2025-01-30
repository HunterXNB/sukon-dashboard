export type Admin = {
  user: {
    id: number;
    email: string;
    mobile: string;
    is_active: boolean;
    first_name: string | null;
    last_name: string | null;
    avatar: string;
    role: {
      id: number;
      name: string;
    };
  };
};
