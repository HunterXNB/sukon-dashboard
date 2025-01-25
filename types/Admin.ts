export type Admin = {
  user: {
    id: number;
    email: string;
    mobile: string;
    is_active: boolean;
    name: string;
    avatar: string;
    role: {
      id: number;
      name: string;
    };
  };
};
