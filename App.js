// Dependências do Navigation Container
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Telas importadas
import Inicial from './screens/Inicial';
import Register from './screens/Register';
import Login from './screens/Login';
import Home from './screens/Home';
import Analysis from './screens/Analysis';

// Criação do stack
const Stack = createNativeStackNavigator();

// Navegação entre as telas
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicial">
        <Stack.Screen options={{ headerShown: false }} name="Inicial" component={Inicial} />
        <Stack.Screen options={{ headerShown: false }} name="Register" component={Register} />
        <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
        <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
        <Stack.Screen options={{ headerShown: false }} name="Analysis" component={Analysis} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

