import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { AuthContextProvider, useAuth } from "../context/authContext";

export default function RootLayout() {
  return (
    <AuthContextProvider>
      <Mainlayout />
    </AuthContextProvider>
  );
}

const Mainlayout = () => {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  // check if user is authenticated or not
  useEffect(() => {
    if (typeof isAuthenticated == "undefined") return;
    const inApp = segments[0] == "(tabs)";
    if (isAuthenticated && !inApp) {
      // redirect to home
      router.replace("home");
    } else if (isAuthenticated == false) {
      router.replace("signin");
    }
  }, [isAuthenticated]);

  return <Slot />;
};
