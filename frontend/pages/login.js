import React, { useState, useEffect } from 'react'
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import Form from 'components/form';


export default function Login() {
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
            } 
        }
        
        return attributes;
    }
    
    if (!loaded) {
        return (<p></p>);
    }

    return (
        <div>
            <h1>Login</h1>

            <Form
                job="login"
                destination={process.env.NEXT_PUBLIC_AUTH_API_URL}
                fields={formFieldData}
                redirect={'/'}
                bodyConstructor={createBody}
            />
        </div>
    )
}