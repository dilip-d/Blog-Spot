import { GoogleLogin } from '@react-oauth/google'
import { useDispatch } from 'react-redux'
import { FacebookLogin, FacebookLoginAuthResponse } from 'react-facebook-login-lite';
import { facebookLogin, googleLogin } from '../../redux/actions/authAction'

const SocialLogin = () => {

    const dispatch = useDispatch()

    const onSuccess = (credentialResponse: any) => {
        const id_token = credentialResponse.credential
        console.log(id_token);

        dispatch<any>(googleLogin(id_token))
    }

    const onFbSuccess = (response: FacebookLoginAuthResponse) => {
        const { accessToken, userID } = response.authResponse
        console.log({ accessToken, userID });
        dispatch<any>(facebookLogin(accessToken, userID))
    }

    const onFbFailure = (error: any) => {
        console.log(error);
    }

    return (
        <>
            <div className='my-2'>
                <GoogleLogin
                    theme='filled_blue'
                    size='large'
                    text='signin'
                    width='340'
                    onSuccess={onSuccess}
                    cancel_on_tap_outside
                />
            </div>
            <div className='my-2'>
                <FacebookLogin
                    appId={process.env.REACT_APP_FACEBOOK_APP_ID || 'default'}
                    onSuccess={onFbSuccess}
                    onFailure={onFbFailure}
                />
            </div>
        </>
    )
}

export default SocialLogin