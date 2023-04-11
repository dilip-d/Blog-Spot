import { GoogleLogin } from '@react-oauth/google'
import jwtDecode from 'jwt-decode'
import { useDispatch } from 'react-redux'
import { googleLogin } from '../../redux/actions/authAction'

const SocialLogin = () => {

    const dispatch = useDispatch()

    const onSuccess = (credentialResponse: any) => {
        console.log(credentialResponse);
        const id_token = credentialResponse.credential
        // const id_token: string = jwtDecode(credentialResponse.credential)
        console.log(id_token);
        
        dispatch<any>(googleLogin(id_token))
    }

    return (
        <div>
            <GoogleLogin
                theme='filled_blue'
                size='large'
                text='signin_with'
                width='200px'
                onSuccess={onSuccess}
                cancel_on_tap_outside
            />
        </div>
    )
}

export default SocialLogin