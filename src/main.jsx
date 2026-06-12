import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './Redux/store.jsx';
import App from './App.jsx';
import { ModalProvider } from './context/ModalContext.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ModalProvider>
        <App />
      </ModalProvider>
    </Provider>
  </StrictMode>,
);
