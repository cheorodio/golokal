import { notFound } from 'next/navigation';
import { getUserByUsername } from '../../../database/user';

type Props = {
  params: { username: string };
};

export default async function UserProfilePage({ params }: Props) {
  const user = await getUserByUsername(params.username);

  if (!user) {
    notFound();
  }
  return <div>welcome back {user.username}</div>;
}
