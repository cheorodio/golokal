'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { User } from '../../migrations/1688217161-createTableUsers';
import styles from '../styles/EditProfile.module.scss';

type Props = {
  currentUser: {
    id: number;
    username: string;
    email: string;
    profileName: string;
    bio: string;
    imageUrl: string;
  };
  user: {
    id: number;
    username: string;
    email: string;
    profileName: string;
    bio: string;
    imageUrl: string;
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
  const [onEditImageUrl, setOnEditImageUrl] = useState<string>('');
  const [error, setError] = useState<string>();

  // for image upload
  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();

  async function updateProfile(
    userId: number,
    username: string,
    profileName: string,
    bio: string,
    imageUrl: string,
  ) {
    const response = await fetch(`/api/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify({
        userId,
        username,
        profileName,
        bio,
        imageUrl,
      }),
    });

    const data = await response.json();

    setUsers(
      users.map((user) => {
        if (user.id === data.user.id) {
          return data.user;
        }
        return user;
      }),
    );
  }

  // upload image to cloudinary
  function handleOnChange(changeEvent: React.ChangeEvent<HTMLInputElement>) {
    const files = changeEvent.target.files!;

    const reader = new FileReader();

    reader.onload = function (onLoadEvent: ProgressEvent<FileReader>) {
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    };

    reader.readAsDataURL(files[0]!);
  }

  async function handleOnSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const fileInput = (Array.from(form.elements) as HTMLInputElement[]).find(
      ({ name }) => name === 'file',
    );

    if (!fileInput) {
      setError([{ message: 'No file found!' }]);
      return;
    }

    const formData = new FormData();

    for (const file of fileInput.files as FileList) {
      formData.append('file', file);
    }

    formData.append('upload_preset', 'golokal-uploads');

    const data = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      },
    ).then((r) => r.json());

    setImageSrc(data.secure_url);
    setUploadData(data);
    // await updateImage();
  }

  return (
    <div className={styles.profilePageContainer}>
      <div className={styles.editForm}>
        <div className={styles.profileInfoCard}>
          {onEditInput !== props.user.username ? (
            <div className={styles.imageContainer}>
              {!props.user.imageUrl ? (
                <img
                  src="/images/avatar.png"
                  width={300}
                  height={300}
                  alt="Profile avatar"
                  className={styles.profileAvatar}
                />
              ) : (
                <img
                  src={props.user.imageUrl}
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
                  setOnEditImageUrl(props.user.imageUrl || '');
                }}
              >
                add profile image
              </button>
            </form>
          ) : null}
        </div>

        {/* USER INFO CONTAINER ADN ADD IMAGE */}
        <div className={styles.userInfoContainer}>
          {onEditInput !== props.user.username ? (
            <>
              <h1>{props.user.profileName}</h1>
              <div className={styles.bioContainer}>
                <p>{props.user.bio}</p>
              </div>
            </>
          ) : (
            <>
              {/* upload image to cloudinary */}
              <form
                method="post"
                onChange={handleOnChange}
                onSubmit={handleOnSubmit}
              >
                <input type="file" name="file" />
                <img
                  src={imageSrc}
                  height={300}
                  width={300}
                  style={{ borderRadius: '50%' }}
                  alt="profile avatar uploaded by user"
                />
                <button>Upload</button>
              </form>

              {/* submit to image api */}
              <form
                onSubmit={async (event) => {
                  event.preventDefault();
                  const response = await fetch('api/images', {
                    method: 'POST',
                    body: JSON.stringify({
                      userId: props.user.id,
                      imageUrl: imageSrc,
                    }),
                  });

                  const data = await response.json();

                  if ('error' in data) {
                    setError(data.error);
                    return;
                  }
                  router.refresh();
                }}
              >
                <button
                  onClick={() => {
                    router.refresh();
                  }}
                >
                  Update profile image
                </button>
              </form>

              {/* <form className={styles.formContainer}>
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
                    onChange={(event) =>
                      setOnEditBio(event.currentTarget.value)
                    }
                  />
                </div>
                <button
                  onClick={async () => {
                    await updateProfile(
                      userId,
                      onEditUsername,
                      onEditProfileName,
                      onEditBio,
                    );
                  }}
                >
                  Save
                </button>
                {error !== '' && <div>{error}</div>}
              </form> */}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
