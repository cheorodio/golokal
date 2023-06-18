import LoginForm from './Login';

type Props = { searchParams: { returnTo?: string | string[] } };

export default function LoginPage({ searchParams }: Props) {
  return (
    <main>
      <LoginForm returnTo={searchParams.returnTo} />
    </main>
  );
}
