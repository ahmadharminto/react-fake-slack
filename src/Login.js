import { Button } from '@material-ui/core'
import React from 'react'
import './Login.scss'
import { auth, provider } from './firebase'
import { useStateValue } from './StateProvider'
import { useHistory } from 'react-router-dom'

const Login = () => {
    const [{ user }, dispatch] = useStateValue();
    const history = useHistory();

    const signIn = (e) => {
        auth.signInWithPopup(provider)
            .then(result => {
                dispatch({
                    type: 'SET_USER',
                    user: result.user
                })
            })
            .catch(error => {
                alert(error.message)
            })
    }

    return (
        <div className="login">
            <div className="login__container">
                <img src="https://cdn3.iconfinder.com/data/icons/social-media-2169/24/social_media_social_media_logo_slack-512.png" alt=""/>
                <h1>Sign in to Toymakr3D Slack</h1>
                <p><a href="toymakr3d.com" target="_blank">toymakr3d.com</a></p>
                <Button onClick={signIn}>Sign In with Google</Button>
            </div>
        </div>
    )
}

export default Login
