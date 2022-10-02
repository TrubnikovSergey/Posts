import React, { Route, Switch } from "react-router-dom"
import Home from "./layout/home"
import Login from "./layout/login"
import NavBar from "./components/navBar"
import Search from "./layout/search"
import "bootstrap/dist/css/bootstrap.css"

function App() {
    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-4 shadow p-3 mb-5 bg-body rounded">
                        <NavBar />
                    </div>
                </div>
            </div>

            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/search" component={Search} />
                <Route path="/:postId?" exact component={Home} />
            </Switch>
        </>
    )
}

export default App
