import { Sql } from 'postgres';

export const users = [
  {
    id: 1,
    username: 'michelle',
    email: 'michelle@email.com',
    passwordHash: 'fsakldja;sjdpaijfalknfcas;kd',
    profileName: 'Michelle',
    bio: 'Hi my name is Michelle and I like all things handmade. I am here to connect with like-minded individuals and discover amazing local vendors near me.',
    shopId: null,
    profileImage: '/images/avatar.png',
  },
  {
    id: 2,
    username: 'annabannana',
    email: 'anna@email.com',
    passwordHash: 'ifjdiqjdclkandvladjk',
    profileName: 'Anna',
    bio: 'Hi my name is Anna and I like all things handmade. I am here to connect with like-minded individuals and discover amazing local vendors near me.',
    shopId: 1,
    profileImage: '/images/avatar.png',
  },
  {
    id: 3,
    username: 'sinalulu',
    email: 'sina@email.com',
    passwordHash: 'daslkjhdlaskjdlkasjd',
    profileName: 'Sina',
    bio: 'Hi my name is Sina and I like all things handmade. I am here to connect with like-minded individuals and discover amazing local vendors near me.',
    shopId: 2,
    profileImage: '/images/avatar.png',
  },
];

export async function up(sql: Sql) {
  for (const user of users) {
    await sql`
    INSERT INTO users
      (username, email, password_hash, profile_name, bio, shop_id, profile_image)
    VALUES
      (${user.username}, ${user.email},${user.passwordHash}, ${user.profileName}, ${user.bio}, ${user.shopId}, ${user.profileImage})
  `;
  }
}

export async function down(sql: Sql) {
  for (const user of users) {
    await sql`
      DELETE FROM users WHERE id = ${user.id}
  `;
  }
}
