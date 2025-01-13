import React, { useContext } from 'react'
import { Button } from '../button'
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { UserContext } from '@/app/context/UserContext';
function SignInPopUp({ openDialog, closeDialog }) {
    const { user, setUser } = useContext(UserContext)
    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            console.log(tokenResponse);
            const userInfo = await axios.get(
                'https://www.googleapis.com/oauth2/v3/userinfo',
                { headers: { Authorization: 'Bearer' + tokenResponse?.access_token } },
            );

            console.log(userInfo);
            setUser(userInfo?.data)
            closeDialog(false)
        },
        onError: errorResponse => console.log(errorResponse),
    });
    return (
        <div>
            <Dialog open={openDialog} onOpenChange={closeDialog} >

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle><div className='text-center p-2'>Please sign in to generate website</div></DialogTitle>
                        <DialogDescription>
                            <div className='text-center justify-center'>
                                <Button onClick={googleLogin} className='bg-blue-400'>Sign in with Google</Button>
                            </div>
                            <div className='text-center mt-2'>You agree to the terms and conditions of the product</div>

                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default SignInPopUp
