# Next.js final project

## About the project 📚

Golokal is a PWA platform connecting you to local vendors and small businesses. The aim is to give local vendors the platform and spotlight to showcase their creations.

### Features:

- User authentication and authorisation
- Favourite feature where users can follow shops which then gets displayed in the user's profile page
- Like feature where users can like products
- Users can create a shop
- Users can upload products into their own shop page

### Planning:g

- Wireframing and prototyping using [Figma](https://www.figma.com/file/KlSNdJK9rZZL9A9fiss7EZ/GoLokal?type=design&node-id=133%3A520&mode=design&t=ASvR4h3bQ3khpw9B-1)
- Database schema design using [drawSQL](https://drawsql.app/teams/michelle-7/diagrams/golokal)

## Technologies ⚛️

<img height="25" src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" alt="javascript logo"/> <img height="25" src="https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white" alt="next js logo"/> <img height="25" src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="react logo"/> <img height="25" src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="typescript logo"/> <img height="25" src="https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white" alt="sass logo"/> <img height="25" src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white" alt="postgres logo"/> <img height="25" src="https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white" alt="jest logo"/> <img height="25" src="https://img.shields.io/badge/Playwright-2EAD33.svg?style=for-the-badge&logo=Playwright&logoColor=white" alt="Playwright logo"/>

## Screenshots 📸

#### Final Look

<img width="900" alt="Golokal final look screenshot" src="https://github.com/cheorodio/golokal/assets/121162907/df272307-fb29-4cf6-b852-c939c5d0fa37">

#### Prototyping

<img width="900" alt="golokal prototyping" src="https://github.com/cheorodio/golokal/assets/121162907/1cfd62e5-0597-44e3-ab09-f967d0cab553">

#### Database schema

<img width="900" alt="Golokal database schema" src="https://github.com/cheorodio/golokal/assets/121162907/f33151de-15ce-464e-a86c-fae0603694ad">

## Setup 💻

1. Clone the repository
   ```
   git clone https://github.com/cheorodio/golokal.git
   cd golokal
   ```
2. Install dependencies using
   ```
   pnpm install
   ```
3. Setup postgres database
4. Create a file called .env in the project root directory and paste the following, changing to your own username, password and database:

   ```
   PGHOST=localhost
   PGUSERNAME=<your username>
   PGPASSWORD=<your password>
   PGDATABASE=<your database name>

   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="<your cloudinary name>"
   ```

5. Then run the following queries, with a database name, username and password of your own.

   ```
   CREATE DATABASE <database name>;
   CREATE USER <user name> WITH ENCRYPTED PASSWORD '<user password>';
   GRANT ALL PRIVILEGES ON DATABASE <database name> TO <user name>;
   \connect <database name>;
   CREATE SCHEMA <user name> AUTHORIZATION <user name>;
   ```

6. Connect to postgres database and run either:

   - `psql -U <user name> <database name>` on windows and macOS
   - `sudo -u <user name> psql -U <user name> <database name>` on Linux

7. Run application
   ```
   pnpm dev
   ```
   Open http://localhost:3000 on browser.

## Deployment 🚀

This project is deployed using vercel, in order to do so:

1. Create an account on [vercel](https://vercel.com/dashboard)
2. Create a postgres storage in vercel and select frankfurt
3. Create a project in vercel and import your version of this repository
4. Overwrite the install command (found in project general setting) with `pnpm install && pnpm migrate up`
5. Connect storage with project in Project > Storage > Connect
