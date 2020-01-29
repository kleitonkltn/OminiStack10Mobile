import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Main from './pages/Main'
import Profile from './pages/Profile'
import List from './pages/List'

const Routes = createAppContainer(
    createStackNavigator({
        Main: {
            screen: Main,
            navigationOptions: {
                title: 'DevRadar'

            }
        },
        Profile: {
            screen: Profile,
            navigationOptions: {
                title: 'Perfil no GitHub'
            }
        },
        List: {
            screen: List,
            navigationOptions: {
                title: 'Devs'
            }
        }
    }, {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#7d40e7'
            }, headerTintColor: '#fff',
            headerTitleAlign: "center"

        }
    }
    ))

export default Routes