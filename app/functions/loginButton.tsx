// import { useState } from 'react';

// export default function Login(props) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = (event) => {
//     event.preventDefault();
//   };
//   return (
//     <div className="login-page">
//       <div className="form-container">
//         <div className="btn-container">
//           <div id="log-in-btn" />
//           <button type="button" className="toggle-btn toggle-login">
//             Log in
//           </button>
//           <button
//             onClick={() => props.onformSwitch('signup')}
//             type="button"
//             className="toggle-btn toggle-signup"
//           >
//             Sign up
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} id="login" className="login-form">
//           <label htmlFor="email">Email address</label>
//           <input
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="login-input"
//             required
//           />
//           <label htmlFor="text">Password</label>
//           <input className="login-input" required />
//           <div className="login-reminder">
//             <div className="reminder">
//               <input
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 type="checkbox"
//                 className="login-checkbox"
//               />{' '}
//               <span>Remember Password</span>
//             </div>
//             <a href="/">forgot password?</a>
//           </div>
//           <button className="login-submit">Log in</button>
//         </form>
//       </div>
//     </div>
//   );
// }
