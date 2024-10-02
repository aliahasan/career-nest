import auth from "@/firebase/firebase.config";
import { setUser } from "@/redux/authSlice";
// import { onAuthStateChanged } from "firebase/auth";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";

// const AuthProvider = ({ children }) => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       dispatch(setUser(currentUser));
//     });

//     return () => unsubscribe();
//   }, [dispatch]);
//   return children;
// };
// export default AuthProvider;
