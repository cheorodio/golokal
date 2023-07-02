'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { RxEyeClosed, RxEyeOpen } from 'react-icons/rx';
import loginImage from '../../../public/images/login.jpg';
import { RegisterResponseBodyPost } from '../../api/(auth)/register/route';
import styles from '../../styles/loginPage.module.scss';

export default function RegisterForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileName, setProfileName] = useState('');
  const [bio, setBio] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [passwordShown, setPasswordShown] = useState(false);

  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  // change image
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target?.result as string);
      };
      reader.readAsDataURL(event.target.files[0]);
    } else {
      setImageUrl(null);
    }
  };

  // upload image
  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const fileInput = Array.from(form.elements)
      .filter(
        (element) =>
          element instanceof HTMLInputElement && element.type === 'file',
      )
      .pop() as HTMLInputElement | undefined;
    if (fileInput) {
      const formData = new FormData();
      if (fileInput.files !== null) {
        for (const file of fileInput.files) {
          formData.append('file', file);
        }
      }
      formData.append('upload_preset', 'golokal-uploads');

      const profilePic = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        },
      ).then((r) => r.json());

      const response = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify({
          username,
          email,
          password,
          profileName,
          bio,
          imageUrl: profilePic.secure_url,
        }),
      });

      const data: RegisterResponseBodyPost = await response.json();

      if ('error' in data) {
        setError(data.error);
        return;
      }
      setSuccess(true);
      console.log(data.user);
      router.push(`/${data.user.username}`);
      router.refresh();
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginFormSide}>
        <div className={styles.greeting}>
          <h1>Welcome</h1>
          <p>
            GoLokal is a platform connecting you with local vendors. Create an
            account to get started.
          </p>
        </div>

        <div className={styles.form}>
          <form
            onSubmit={handleOnSubmit}
            id="login"
            className={styles.loginForm}
          >
            <div>
              <label htmlFor="profilePic">
                Profile picture <span>*</span>
              </label>
              <input
                id="profilePic"
                type="file"
                name="file"
                ref={fileInputRef}
                onChange={handleOnChange}
              />
            </div>
            <div>
              {!!imageUrl && (
                <Image
                  src={imageUrl}
                  height={100}
                  width={100}
                  alt="User profile avatar"
                />
              )}
            </div>

            <div>
              <label htmlFor="username">
                Username <span>*</span>
              </label>
              <input
                id="username"
                value={username}
                onChange={(event) => setUsername(event.currentTarget.value)}
              />
            </div>

            <div>
              <label htmlFor="profileName">
                Profile name <span>*</span>
              </label>
              <input
                id="profileName"
                value={profileName}
                onChange={(event) => setProfileName(event.currentTarget.value)}
              />
            </div>

            <div>
              <label htmlFor="email">
                Email <span>*</span>
              </label>
              <input
                id="email"
                value={email}
                onChange={(event) => setEmail(event.currentTarget.value)}
              />
            </div>

            <div>
              <label htmlFor="bio">
                Bio <span>*</span>
              </label>
              <textarea
                id="bio"
                placeholder="Write a little something about yourself"
                value={bio}
                onChange={(event) => setBio(event.currentTarget.value)}
              />
            </div>

            <div>
              <label htmlFor="password">
                Password <span>*</span>
              </label>
              <div>
                <input
                  id="password"
                  type={passwordShown ? 'text' : 'password'}
                  value={password}
                  onChange={(event) => setPassword(event.currentTarget.value)}
                />
                <button
                  onClick={togglePassword}
                  className={styles.showPasswordButton}
                >
                  {passwordShown ? <RxEyeClosed /> : <RxEyeOpen />}
                </button>
              </div>
            </div>
            <button className={styles.loginSubmit}>Register</button>
            {error !== '' && <div className={styles.error}>{error}</div>}
            {success && (
              <p>
                Succesfull registration! Please wait to be directed to your
                profile 😄
              </p>
            )}
          </form>
          <div className={styles.signupContainer}>
            <p>
              Already have an account?
              <Link href="/login" className={styles.registerLink}>
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className={styles.imageSide}>
        <Image
          src={loginImage}
          alt="Image of handmade pottery"
          className={styles.loginImage}
        />
      </div>
    </div>
  );
}
