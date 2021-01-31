import React from 'react';
import Main from './components/MainComponent';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import { PersistGate } from 'redux-persist/es/integration/react'
import { Loading } from './components/LoadingComponent';

const { persistor, store } = ConfigureStore();

export default class App extends React.Component {
  render() {
    return (
        <Provider store={store}>
          <PersistGate 
          loading={<Loading />}
          persistor={persistor}>
            <Main/>
          </PersistGate>
        </Provider>
    );
  }
}

/*
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import React from 'react';
import { Text, View } from 'react-native';

export default function App() {
  const [fontsLoaded] = Font.useFonts({
    'Inter-Black': require('./assets/fonts/Inter-Black.otf'),
    'Inter-SemiBoldItalic':
      'https://rsms.me/inter/font-files/Inter-SemiBoldItalic.otf?v=3.12',
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Platform Default</Text>
      <Text style={{ fontFamily: "Inter-Black" }}>Inter Black</Text>
      <Text style={{ fontFamily: "Inter-SemiBoldItalic" }}>
        Inter SemiBoldItalic
      </Text>
    </View>
  );
}
*/
