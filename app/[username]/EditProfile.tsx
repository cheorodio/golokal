'use client';

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
};

export default function EditProfile(props: Props) {
  return (
    <div className={styles.profilePageContainer}>
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

      {/* Edit profile info*/}
      {props.currentUser.username === props.user.username && (
        <button className={styles.editButton}>Edit profile</button>
      )}

      <div className={styles.nameContainer}>
        <h1>{props.user.profileName}</h1>
      </div>
      <div>
        <p>@{props.user.username}</p>
      </div>
      <div className={styles.bioContainer}>
        <p>{props.user.bio}</p>
      </div>
    </div>
  );
}
