import './App.scss';
import Header from './Header';
import Sidebar from './Sidebar';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Chat from './Chat';
import { useStateValue} from './StateProvider';
import Login from './Login';
import { auth } from './firebase'
import { useEffect } from 'react';


function App() {
  const [{ user }, dispatch] = useStateValue()

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if (authUser) {
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      } else {
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  }, [dispatch])

  return (
    <div className="app">
      <Router>
        {
          !user ? (
            <Login />
          ) : (
            <> {/* fragment */}
              <Header />
              <div className="app__body">
                <Sidebar />
                <Switch>
                  <Route exact path="/">
                    <h1>Welcome</h1>
                  </Route>
                  <Route path="/room/:roomId">
                    <Chat />
                  </Route>
                </Switch>
              </div>
            </>
          )
        }
      </Router>
    </div>
  );
}

export default App;
