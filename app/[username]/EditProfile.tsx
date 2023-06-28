'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { User } from '../../migrations/1687947560-createUsers';
import styles from '../styles/EditProfile.module.scss';

type Props = {
  currentUser: {
    id: number;
    username: string;
    email: string;
    profileName: string;
    bio: string;
    profileImage: string;
  };
  user: {
    id: number;
    username: string;
    email: string;
    profileName: string;
    bio: string;
    profileImage: string;
  };
  users: User[];
};

export default function EditProfile(props: Props) {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>(props.users);
  const [onEditInput, setOnEditInput] = useState<string>();
  const [onEditUsername, setOnEditUsername] = useState<string>('');
  const [onEditProfileName, setOnEditProfileName] = useState<string>('');
  const [onEditBio, setOnEditBio] = useState<string>('');
  const [onEditProfileAvatar, setOnEditProfileAvatar] = useState<string>('');

  const [error, setError] = useState<string>();

  async function updateProfile(
    username: string,
    profileName: string,
    bio: string,
  ) {
    const response = await fetch(`/api/users/${props.user.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        username,
        profileName,
        bio,
      }),
    });

    const data = await response.json();

    if ('error' in data) {
      setError(data.error);
      return;
    }
    setOnEditInput(undefined);
    setUsers([...users, data.user]);
    router.refresh();
  }

  return (
    <div className={styles.profilePageContainer}>
      <div className={styles.editForm}>
        <div className={styles.profileInfoCard}>
          {onEditInput !== props.user.username ? (
            <div className={styles.imageContainer}>
              {!props.user.profileImage ? (
                <Image
                  src="/images/avatar.png"
                  width={300}
                  height={300}
                  alt="Profile avatar"
                  className={styles.profileAvatar}
                />
              ) : (
                <Image
                  src={props.user.profileImage}
                  width={300}
                  height={300}
                  alt="Profile avatar"
                  className={styles.profileAvatar}
                />
              )}
            </div>
          ) : null}

          {/* Edit profile info*/}
          {props.currentUser.username === props.user.username &&
          onEditInput !== props.user.username ? (
            <form className={styles.editButton}>
              <button
                onClick={() => {
                  setOnEditInput(props.user.username);
                  setOnEditUsername(props.user.username);
                  setOnEditProfileName(props.user.profileName || '');
                  setOnEditBio(props.user.bio || '');
                  setOnEditProfileAvatar(props.user.profileImage || '');
                }}
              >
                Edit profile
              </button>
            </form>
          ) : null}
        </div>

        {/* Other user's
        {props.currentUser.username !== props.user.username ? (
          <div className={styles.othersProfile}>
            <div>{props.user.profileName}'s favourites</div>
          </div>
        ) : null} */}

        {/* USER INFO CONTAINER */}
        <div className={styles.userInfoContainer}>
          {onEditInput !== props.user.username ? (
            <>
              <h1>{props.user.profileName}</h1>
              <div className={styles.bioContainer}>
                <p>{props.user.bio}</p>
              </div>
            </>
          ) : (
            <form className={styles.formContainer}>
              <div>
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  value={onEditUsername}
                  onChange={(event) =>
                    setOnEditUsername(event.currentTarget.value)
                  }
                />
              </div>
              <div>
                <label htmlFor="profileName">Profile Name</label>
                <input
                  id="profileName"
                  value={onEditProfileName}
                  onChange={(event) =>
                    setOnEditProfileName(event.currentTarget.value)
                  }
                />
              </div>
              <div>
                <label htmlFor="bio">Bio</label>
                <textarea
                  id="bio"
                  value={onEditBio}
                  onChange={(event) => setOnEditBio(event.currentTarget.value)}
                />
              </div>
              <button
                onClick={async () => {
                  await updateProfile(
                    onEditUsername,
                    onEditProfileName,
                    onEditBio,
                  );
                }}
              >
                Save
              </button>
              {error !== '' && <div>{error}</div>}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
