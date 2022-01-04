import Form from 'components/Form';


export default function Register() {
    const formFieldData = [
        {
            type: 'input',
            name: 'name'
        },
        {
            type: 'input',
            name: 'username'
        },
        {
            type: 'input',
            name: 'password'
        },
        {
            type: 'input',
            name: 'password confirm'
        },
        {
            type: 'radio',
            name: 'isHost'
        }
    ];

    return (
        <Form
            destination={process.env.AUTH_API_URL+"/register"}
            fields={formFieldData}
            redirect={'/'}
        />
    )
}