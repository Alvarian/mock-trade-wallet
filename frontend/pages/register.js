import Form from 'components/form';


export default function Register() {
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

    return (
        <Form
            job="register"
            destination={process.env.AUTH_API_URL}
            fields={formFieldData}
            redirect={'/'}
        />
    )
}