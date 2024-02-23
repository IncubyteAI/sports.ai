import useAuth from "app/hooks/useAuth";
import { Redirect, Tabs } from "expo-router";

export default function MainLayout() {
  const auth = useAuth();
  return auth ? (
    <Tabs>
      <Tabs.Screen name="home" />
      <Tabs.Screen name="test" />
      <Tabs.Screen name="profile" />
    </Tabs>
  ) : (
    <Redirect href="/login" />
  );
}
