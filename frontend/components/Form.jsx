import React, { useState } from "react";

export default function Form({
    destination,
    fields,
    redirect
}) {
    const [formData, setFormData] = useState({
        email: "",
        message: "",
        file: null
    });

    function handleChange(e) {
        if (e.target.files) {
            setFormData({ ...formData, [e.target.name]: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();

        // Use fetch or axios to submit the form
        await axios
            .post(process.env.AUTH_API_URL+"/login", formData)
            .then(({ data }) => {
                const { redirect } = data;
                // Redirect used for reCAPTCHA and/or thank you page
                window.location.href = redirect;
            })
            .catch((e) => {
                window.location.href = e.response.data.redirect;
            });
    }

    return (
        <form className="form-control">
            {fields.map(field => {
                return field.type === "input" && <input type="text" placeholder={field.name} className="input" /> || field.type === "radio" && <input type="radio" checked="checked" className="radio radio-md" value="" />
            })}

            <button>Submit</button>
        </form>
    )
}


export function appendFields(fieldData) {
    return fieldData.map(field => {
        if (null) {
            return <div></div>
        }

        if(null) {
            return <div></div>
        }

        return <div></div>
    })
}