import { NavigationContainer } from "@react-navigation/native";
import { AppNavigation } from "./src/navigation/AppNavigation";
import { UserContextProvider } from "./src/Context/UserContext";
export default function App() {
  return (
    <UserContextProvider>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    </UserContextProvider>
  );
}
