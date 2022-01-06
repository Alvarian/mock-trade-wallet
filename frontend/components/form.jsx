import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import Button from "components/button";
import Input from "components/input";
import { capitalizeFirstLetter } from "lib/formaters";


export default function Form({
    job,
    destination,
    fields,
    redirect,
    callBacks,
    bodyConstructor
}) {
    const [formData, setFormData] = useState(fields);
    const router = useRouter();

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
        const formBody = e.currentTarget;

        try {
            for (let func of callBacks) {
                const checkOrMatchResult = await func(formBody, destination);

                if (!checkOrMatchResult.success) throw checkOrMatchResult.msg;
            }
            
            const body = await bodyConstructor(formBody);
            
            const response = await fetch(`${destination}/${job}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            const status = await response;
            if (!status.ok) throw status.statusText;

            router.push({
                pathname: redirect,
                // query: {q: query},
            });
        } catch (err) {
            console.log("error:", err);

            router.push({
                pathname: router.pathname,
                // query: {q: query},
            });
        }
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
