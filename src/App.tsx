import { createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider } from 'react-router-dom';
import { HttpClient } from './common/services/HttpClient';
import Home from './components/Home';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { DataLoader } from './common/services/DataLoader';
import { AuthToken } from './common/services/AuthToken';

export default function App() {

    const router = createBrowserRouter(
        createRoutesFromElements(
                <>
                    <Route path='/' element={<Home />} loader={() => new DataLoader(new AuthToken('user'), new HttpClient(), 'http://localhost:3005').loadData()} />
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
                <h1 className='title'>My to do list</h1>
            </div>
            <div>
                <Outlet />
            </div>
        </>
    )
}