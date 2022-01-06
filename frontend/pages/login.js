import Form from 'components/form';


export default function Login() {
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