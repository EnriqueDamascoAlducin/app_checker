import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AccountScreen from '../views/Account/AccountScreen';
import { routes } from '../../utils/routes';


const Stack = createNativeStackNavigator();

export default function AccountStack() {
    return (
        <Stack.Navigator >
            <Stack.Screen name={routes.account.profile.tab_key} options={routes.account.profile.options} component={AccountScreen} />
        </Stack.Navigator>
    )
}
