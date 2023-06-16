import { cache } from 'react';
import { sql } from './connect';

type UserWithPasswordHash = {
  id: number;
  username: string;
  passwordHash: string;
};

export type User = {
  id: number;
  username: string;
};

export const getUsers = cache(async () => {
  const users = await sql<UserWithPasswordHash[]>`
SELECT * FROM users`;

  return users;
});
