// import auth from "@/firebase/firebase.config";
// import { secureApi } from "@/hooks/useSecureApi";
// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
// export const signInWithGoogle = createAsyncThunk(
//   "auth/signInWithGoogle",
//   async (_, { rejectWithValue }) => {
//     try {
//       const provider = new GoogleAuthProvider();
//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;
//       const googleUser = {
//         fullName: user.displayName,
//         email: user.email,
//         photoURL: user.photoURL,
//         phoneNumber: user?.phoneNumber || "123456",
//         role: "student",
//         isGoogleUser: true,
//       };

//       const response = await secureApi.post("/user/google-login", googleUser);
//       console.log(response);

//       if (response.data.success) {
//         return response.data.user;
//       } else {
//         return rejectWithValue(
//           response.data.message || "Google authentication failed"
//         );
//       }
//     } catch (error) {
//       console.error("Google Sign-In Error:", error);
//       return rejectWithValue(error.message || "Google authentication failed");
//     }
//   }
// );

// export const logout = createAsyncThunk(
//   "auth/logout",
//   async (_, { rejectWithValue }) => {
//     try {
//       await secureApi.post("/user/logout");
//       await signOut(auth);
//       return true;
//     } catch (error) {
//       await signOut(auth);
//       console.error("Logout failed:", error);
//       return rejectWithValue(error.message || "Logout failed");
//     }
//   }
// );
