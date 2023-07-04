import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getValidSessionByToken } from '../../../database/sessions';
import RegisterForm from './Register';

export default async function RegisterPage() {
  // redirect if the user is logged in
  // 1. check if the sessionToken cookie exists
  const sessionTokenCookie = cookies().get('sessionToken');
  // 2. check if the sessionToken has a valid session
  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));
  // either redirect or render the login form
  if (session) redirect('/');

  return <RegisterForm />;
}
