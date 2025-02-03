import React, { useContext } from 'react'
import { Button } from '../../../components/ui/button'
import { useGoogleLogin } from '@react-oauth/google';
import { api } from '../../../convex/_generated/api';
import axios from 'axios';
import uuid4 from "uuid4";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from  '../../../components/ui/dialog'
import { UserContext } from '../../context/UserContext';
import { useMutation } from 'convex/react';
function SignInPopUp({ openDialog, closeDialog }) {
    const { user, setUser } = useContext(UserContext)
    const CreateUser = useMutation(api.user.CreateUser)
    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            console.log(tokenResponse);
            const userInfo = await axios.get(
                'https://www.googleapis.com/oauth2/v3/userinfo',
                { headers: { Authorization: 'Bearer' + tokenResponse?.access_token } },
            );

            console.log(userInfo);
            const user = userInfo?.data
            setUser(userInfo?.data)

            await CreateUser({
                name:user?.name,
                email:user?.email,
                image:user?.picture,
                phone: user?.phone || "",
                uuid:uuid4()
            })

            if(typeof window!=undefined){
                localStorage.setItem('user',JSON.stringify(user))
            }
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
