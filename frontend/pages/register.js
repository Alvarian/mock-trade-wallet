import Form from 'components/form';
import LandingLayout from 'components/layout/landingLayout';
import { checkRegistrationData } from "lib/checkers";


Register.getInitialProps = async function ({ req }) {
    if (!req) {
        return {
            cookies: null
        }
    }
  
    return {
        cookies: req.cookies
    }
}

export default function Register({ cookies }) {
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

    return (
        <LandingLayout cookies={cookies}>
            <h1>Register</h1>

            <Form
                job="register"
                destination={process.env.NEXT_PUBLIC_AUTH_API_URL}
                fields={formFieldData}
                redirect={'/login'}
                callBacks={[checkRegistrationData]}
                bodyConstructor={createBody}
            />
        </LandingLayout>
    )
}