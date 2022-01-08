import LandingLayout from 'components/layouts/landingLayout';
import Form from 'components/form';


Login.getInitialProps = async function ({ req }) {
    if (!req) {
        return {
            cookies: null
        }
    }
  
    return {
        cookies: req.cookies
    }
}

export default function Login({ cookies }) {
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

    return (
        <LandingLayout page={'assets'} cookies={cookies}>
            <h1>Login</h1>

            <Form
                job="login"
                destination={process.env.NEXT_PUBLIC_AUTH_API_URL}
                fields={formFieldData}
                redirect={'/home'}
                bodyConstructor={createBody}
            />
        </LandingLayout>
    )
}