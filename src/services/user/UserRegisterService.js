import EndpointService from "@/services/server/EndpointService";
import { handleError, handleSuccess } from "@/services/MessageHandlerService";

/**
 * Register a new user.
 */
export async function registerUser(user, confirmPassword) {
    try {
        if (user.password !== confirmPassword) {
            console.error("Passwords do not match, password: " + user.password + ", confirmPassword: " + user.confirmPassword + ".");
            handleError("Passwords do not match", 'error-message');
            return;
        }

        const formData = {
            salutation: user.salutation,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
            country: user.country,
            role: 'USER',
        };

        const response = await EndpointService.post("users/createUser", formData);

        if (response.status === 201) {
            user.salutation = 'MALE';
            user.firstName = '';
            user.lastName = '';
            user.email = '';
            user.password = '';
            user.country = 'none';
            user.confirmPassword = '';

            handleSuccess("User has been created successfully");
            console.info("User has been created successfully")
        } else {
            handleError("User registration failed. Please try again later.");
        }
    } catch (error) {
        console.error('Error:', error);
        handleError("An error occurred. Please try again later.");
    }
}
