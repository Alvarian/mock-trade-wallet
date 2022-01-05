import React, { useState, useEffect } from "react";
import Button from "components/button";
import Input from "components/input";
import { capitalizeFirstLetter } from "lib/formatting";


export default function Form({
    job,
    destination,
    fields,
    redirect
}) {
    const [formData, setFormData] = useState(fields);
    
    function handleChange(index, e) {
        let newFormData = [...formData];

        if (e.currentTarget.type === "checkbox") {
            newFormData[index].value = e.currentTarget.checked;
        } else {
            newFormData[index].value = e.currentTarget.value;
        }

        setFormData(newFormData);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        // Use fetch or axios to submit the form
        await axios
            .post(`${destination}/${job}`, formData)
            .then((data) => {
                console.log(data)
                
                router.push({
                    pathname: redirect,
                    query: {q: query},
                });
            })
            .catch((e) => {
                router.push({
                    pathname: redirect,
                    query: {q: query},
                });
            });
    }

    return (
        <form className="p-6 card bordered" onSubmit={handleSubmit}>
            {formData.map((field, key) => {
                return (
                    <Input
                        key={key}
                        as={field.as}
                        name={field.name}
                        label={field.label}
                        value={field.value}
                        size={field.size}
                        state={field.state}
                        color={field.color}
                        isBordered={field.isBordered}
                        isActive={field.isActive}
                        isOutlined={field.isOutlined}
                        isDisabled={field.isDisabled}
                        isLoading={field.isLoading}
                        styles={field.styles}
                        callBack={handleChange}
                        index={key}
                    />
                )
            })}

            <Button
                as="submit"
            >{capitalizeFirstLetter(job)}</Button>
        </form>
    )
}
