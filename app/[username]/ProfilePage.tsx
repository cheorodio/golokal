'use client';

import { Domine } from 'next/font/google';
import Image from 'next/image';
import styles from '../styles/EditProfile.module.scss';
import { capitaliseName } from './capitalisedName';

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

const domine = Domine({
  subsets: ['latin'],
  display: 'swap',
});

export default function ProfilePage(props: Props) {
  return (
    <div className={styles.profilePageContainer}>
      <div className={styles.imageContainer}>
        {!props.user.imageUrl ? (
          <Image
            src="/images/avatar.png"
            width={100}
            height={100}
            alt="Profile avatar"
            className={styles.profileAvatar}
          />
        ) : (
          <Image
            src={props.user.imageUrl}
            width={100}
            height={100}
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
        <h1 className={domine.className}>
          {capitaliseName(props.user.profileName)}
        </h1>
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
