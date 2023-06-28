'use client';

// import styles from '../styles/EditProfile.module.scss';

export default function MyFavourites(props: any) {
  return (
    <>
      {props.favourites.map((favourite: any) => {
        return (
          <div key={`favourite-div-${favourite.shopId}`}>
            <p>{favourite.shopName}</p>
            hi
          </div>
        );
      })}
    </>
  );
}
