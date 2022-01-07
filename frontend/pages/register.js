import React, { useState, useEffect } from 'react';
import Form from 'components/form';
import { checkRegistrationData } from "lib/checkers";
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';


export default function Register() {
    const [loaded, setLoaded] = useState(false);
    const router = useRouter();

    useEffect(async () => {
        const userID = getCookie('user_id');
        
        try {
            if (!userID) throw "Unauthorized";

            router.push({
                pathname: '/home'
            });
        } catch (err) {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_AUTH_API_URL}/clear_cookies`, {
                    method: "GET",
                    credentials: "include"
                });
                if (!response.ok) throw response.statusText;
                const data = await response.json();
                if (!data.ok) throw data.statusText;
            } catch (err) {
                console.log(err);

                setLoaded(true);
            }
        }
    });

    const formFieldData = [
        {
            name: 'name',
            label: 'Enter your name',
            value: '',
            as: "text",
        },
        {
            name: 'username',
            label: 'Enter a username',
            value: '',
            as: "text",
        },
        {
            name: 'password',
            label: 'Enter a password',
            value: '',
            as: "text",
        },
        {
            name: 'password2',
            label: 'Confirm password',
            value: '',
            as: "text",
        },
        {
            as: "radio",
            name: "isHost",
            label: 'Are you a host?',
            value: false,
            isBordered: true,
        }
    ];

    function createBody(registeredFormData) {
        let attributes = {};
        
        for (let field of registeredFormData) {
            if (field.name === 'username') {
                attributes[field.name] = field.value;
            } else if (field.name === 'name') {
                attributes[field.name] = field.value;
            } else if (field.name === 'password') {
                attributes[field.name] = field.value;
            } else if (field.name === 'isHost') {
                attributes[field.name] = field.checked;
            } 
        }
        
        return attributes;
    }
    
    if (!loaded) {
        return (<p></p>)
    }

    return (
        <div>
            <h1>Register</h1>

            <Form
                job="register"
                destination={process.env.NEXT_PUBLIC_AUTH_API_URL}
                fields={formFieldData}
                redirect={'/login'}
                callBacks={[checkRegistrationData]}
                bodyConstructor={createBody}
            />
        </div>
    )
}