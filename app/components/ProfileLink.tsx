'use client';

import { Route } from 'next';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { LoginResponseBodyPost } from '../api/(auth)/vendorLogin/route';
import { getSafeReturnToPath } from '../util/validation';

type Props = { returnTo?: string };

export default function ProfileLink(props: Props) {
  const [error, setError] = useState<string>();
  const router = useRouter();

  async function profile() {
    const response = await fetch('/api/vendorLogin', {
      method: 'GET',
    });

    const data: LoginResponseBodyPost = await response.json();

    if ('error' in data) {
      setError(data.error);
      console.log(data.error);
      return;
    }
    router.push(
      getSafeReturnToPath(props.returnTo) ||
        (`/${data.vendor.username}` as Route),
    );
    router.refresh();
  }
  return (
    <div>
      {' '}
      {error !== '' && (
        <button onClick={async () => await profile()}>profile </button>
      )}
    </div>
  );
}
