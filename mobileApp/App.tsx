import * as React from 'react';
import { Provider } from 'react-redux'
import { persistor, store } from './src/utils/redux/Store';
import { PersistGate } from 'redux-persist/integration/react';
import Navigation from './src/Navigation';

export default function App() {

  return (
    <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
    <Navigation/>
    </PersistGate>
    </Provider>
  );
}