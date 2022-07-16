import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { AlbumRender } from '../app/home/AlbumRender';
import Home from '../app/home/Home';
import { PlayMusicHome } from '../app/home/PlayMusicHome';
import { FirstSplash } from '../app/screens/FirstSplash';
import { SecondSplash } from '../app/screens/SecondSplash';
import { ConfirmPassword } from '../app/security/ConfirmPassword';
import { Login } from '../app/security/Login';
import { Register } from '../app/security/Register';
import { ResetPasword } from '../app/security/ResetPasword';
import { HomeStates } from '../context/HomeContext/HomeSates';
import TakiTriContext from '../context/SecurityContext/TakiTriContext';
import { WaitPage } from '../src/components/WaitPage';

const Stack = createNativeStackNavigator();
const StackAutenticated = createNativeStackNavigator();


export const Navigation = () => {
    const { isAutenticated, currentAutenticatedUser, handleLoading } = useContext(TakiTriContext)
    React.useEffect(() => {
        //currentAutenticatedUser();
        setTimeout(currentAutenticatedUser, 1000)
    }, [])
    React.useEffect(() => {

        handleLoading(false);

    }, [isAutenticated])
    return (
        <HomeStates>
            {
                isAutenticated === null ? <WaitPage></WaitPage> : isAutenticated == true ? <AtenticatedUser /> : <UnAtenticatedUser />
            }
            {
                //isAutenticated === true ? <AtenticatedUser /> : <UnAtenticatedUser />
            }

        </HomeStates>
    );
}
const UnAtenticatedUser = () => {
    return (
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
        </Stack.Navigator>
    );
}
const AtenticatedUser = () => {

    return (
        <StackAutenticated.Navigator initialRouteName='Home'>
            <Stack.Screen name="Home"
                component={Home}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="PlayMusicHome"
                component={PlayMusicHome}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="AlbumListMusic"
                component={AlbumRender}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="Favorites"
                component={AlbumRender}
                options={{ headerShown: false }}

            />
        </StackAutenticated.Navigator>
    );
}