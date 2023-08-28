import React from 'react'
import { SWRConfig } from 'swr';
import { AppRouter } from './routes/AppRouter'
import { Provider } from 'react-redux';
import { store } from './store/store';
import 'react-toastify/dist/ReactToastify.css';

export const TweeterApp = () => {
    return (
      <Provider store={store}>
        <SWRConfig 
          value={{
            refreshInterval: 3000,
            fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
          }}
        >
              <AppRouter />  
              
        </SWRConfig>
      </Provider>   
    )
}
