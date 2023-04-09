import { createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider } from 'react-router-dom';
import { HttpClient } from './common/services/HttpClient';
import Home from './components/Home';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { DataLoader } from './common/services/DataLoader';
import { LocalStorageHandler } from './common/services/LocalStorageHandler';

export default function App() {

    const router = createBrowserRouter(
        createRoutesFromElements(
                <>
                    <Route path='/' element={<Home />} loader={() => new DataLoader(new LocalStorageHandler('user'), new HttpClient(), 'http://localhost:3005').loadData()} />
                    <Route path='/login' element={<Root />}>
                        <Route index element={<Login />} />
                        <Route path='signup' element={<Signup />} />
                    </Route>
                </>
        )
    )

    return (
        <div className="App">
            <RouterProvider router={router} />
        </div>
    );
}

const Root = () => {
    return (
        <>
            <div>
                <h1 className='title' data-cy='title'>My to do list</h1>
            </div>
            <div>
                <Outlet />
            </div>
        </>
    )
}