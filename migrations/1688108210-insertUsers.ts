import { Sql } from 'postgres';

export const users = [
  {
    id: 1,
    username: 'Tay',
    email: 'Tay@email.com',
    passwordHash: 'fsakldja;sjdpaijfalknfcas;kd',
    profileName: 'Tay',
    bio: 'Hi my name is Tay and I make handmade earrings using polymer clay. I am here to connect with like-minded individuals and discover amazing local vendors near me.',
    shopId: null,
    imageUrl: '/images/avatar.png',
  },
  {
    id: 2,
    username: 'sinalulu',
    email: 'sina@email.com',
    passwordHash: 'daslkjhdlaskjdlkasjd',
    profileName: 'Sina',
    bio: 'Hi my name is Sina and I made handpoured scented candles using soy wax and organic essential oils. I am here to connect with like-minded individuals and discover amazing local vendors near me.',
    imageUrl: '/images/avatar.png',
  },
  {
    id: 3,
    username: 'tonybee',
    email: 'tony@email.com',
    passwordHash: 'ifjdiqjdclkandvladjk',
    profileName: 'Tony',
    bio: 'Hi my name is Tony and I am the owner of keramiks. I am here to connect with like-minded individuals and discover amazing local vendors near me.',
    imageUrl: '/images/avatar.png',
  },
  {
    id: 4,
    username: 'lana',
    email: 'lana@email.com',
    passwordHash: 'daslkjhdlaskjdlkasjd',
    profileName: 'Lana',
    bio: 'Hi my name is Lana, owner of the soap compnay and I make handmade soap. I am here to connect with like-minded individuals and discover amazing local vendors near me.',
    imageUrl: '/images/avatar.png',
  },
];

export async function up(sql: Sql) {
  for (const user of users) {
    await sql`
    INSERT INTO users
      (username, email, password_hash, profile_name, bio, image_url)
    VALUES
      (${user.username}, ${user.email},${user.passwordHash}, ${user.profileName}, ${user.bio},  ${user.imageUrl})
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
