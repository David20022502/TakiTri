import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native';
import Home from '../app/home/Home';
import { PlayMusicHome } from '../app/home/PlayMusicHome';
import { FirstSplash } from '../app/screens/FirstSplash';
import { SecondSplash } from '../app/screens/SecondSplash';
import { ConfirmPassword } from '../app/security/ConfirmPassword';
import { Login } from '../app/security/Login';
import { Register } from '../app/security/Register';
import { ResetPasword } from '../app/security/ResetPasword';
import { HomeStates } from '../context/HomeContext/HomeSates';

const Stack = createNativeStackNavigator();

export const Navigation = () => {
    return (
            <HomeStates>
                <Stack.Navigator initialRouteName='firstSplash'>
                    <Stack.Screen name="firstSplash"
                        component={FirstSplash}
                        options={{ headerShown: false }}

                    />
                    <Stack.Screen name="secondSplash"
                        component={SecondSplash}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen name="login"
                        component={Login}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen name="register"
                        component={Register}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen name="ResetPasword"
                        component={ResetPasword}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen name="ConfirmPassword"
                        component={ConfirmPassword}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen name="Home"
                        component={Home}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen name="PlayMusicHome"
                        component={PlayMusicHome}
                        options={{ headerShown: false }}
                    />
                </Stack.Navigator>
            </HomeStates>
    );
}
