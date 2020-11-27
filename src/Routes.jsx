import React from 'react';
import { BrowserRouter, Route, Switch, Redirect  } from 'react-router-dom';
// import moment from 'moment';

// rotas de views
import Welcome from './views/Welcome';
import Home from './views/Home';
import UserProfile from './proflile/UserProfile';
import EditProfile from './proflile/EditProfile';
import NotFound from './views/404';

// rotas de login/registro
import Login from './login/Login';
import Register from './login/Register';
import Logout from './login/Logout';

// importando forms
import AddHoras from './forms/NewRegister';
import EditHoras from './forms/EditRegister';

export default function Routes(){
    const PrivateRoute = (props) => {
        const isLogged = !!localStorage.getItem('app-token');

        return isLogged ? <Route { ...props} /> : <Redirect to="/welcome" />
    }

    return (
        <>
            <BrowserRouter>
                <Switch>
                    <PrivateRoute exact path="/" component={Home} />
                    <PrivateRoute exact path="/horas/new" component={AddHoras} />
                    <PrivateRoute exact path="/horas/edit/:id" component={EditHoras} />
                    <PrivateRoute exact path="/perfil/:username/" component={UserProfile} />
                    <PrivateRoute exact path="/perfil/:username/edit/" component={EditProfile} />
                    <Route path="/welcome" component={Welcome} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/logout" component={Logout} />
                    <Route exact path="/register" component={Register} />
                    <Route exact patch="/404" component={NotFound} />
                </Switch>
            </BrowserRouter>
        </>
    )
}