// NB nb

import { createStackNavigator } from "@react-navigation/stack";
import Booking from "../src/screens/Booking";
import Login from "../src/screens/Login";
import Nav from "../src/screens/Nav";
import Splash from "../src/screens/Splash";
import NavButtons from "../src/screens/NavButtons";
import JoinAssociations from "../src/screens/JoinAssociations";

const Stack = createStackNavigator();

export const HomeStack = () => {
    return (    
    <Stack.Navigator>
        <Stack.Screen name="NavButtons" component={NavButtons} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Booking" component={Booking} />
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Nav" component={Nav} />
        <Stack.Screen name="JoinAssociations" component={JoinAssociations} />
    </Stack.Navigator>
    );
}