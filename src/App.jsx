import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Routes from './Routes/Routes'
import { Provider } from 'react-redux'
import store from './store/store'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Provider store={store}>
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover
            theme="colored"
            toastClassName="rounded-lg shadow-lg bg-gray-800 text-white"
            bodyClassName="text-sm font-semibold"
            progressClassName="bg-teal-500"
          />
          <Routes />
        </Provider>
      </BrowserRouter>
    </div>
  )
}

export default App
