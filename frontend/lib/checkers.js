export async function checkRegistrationData(formData, destination) {
    let checkAgainst = "";
    
    for (let { name, value } of formData) {
        if (name === 'password' || name === 'password2') {
            if (!checkAgainst) {
                checkAgainst = value;
            } else if (value === checkAgainst) {
                return {
                    msg: "Password Matched!",
                    success: true
                };
            } else {
                return {
                    msg: "Password does not match!",
                    success: false
                }
            }
        }
    }
}
