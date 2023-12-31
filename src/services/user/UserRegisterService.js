import EndpointService from "@/services/server/EndpointService";
import {handleError, handleSuccess} from "@/services/MessageHandlerService";
import {useAppStore} from "@/services/store/appStore";
import registrationSchema from "@/services/schema/RegistrationSchemaService";

/**
 * Register a new user.
 */
export async function registerUser(user, confirmPassword) {
    try {
        console.info("Validating user registration data: " + JSON.stringify(user));

        try {
            await registrationSchema.validate({ ...user, confirmPassword }, { abortEarly: false });
            console.info("User registration data is valid");
        } catch (error) {
            console.error("Validation failed: " + error);
            error.inner.forEach((e) => {
                handleError(e.message);
            });
            return false;
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

        if (user.salutation === 'OTHER') {
            formData.otherSalutationDetail = user.otherSalutationDetail;
        }

        const response = await EndpointService.post("auth/register", formData);

        console.info("User registration response: " + JSON.stringify(response));
        if (response.status === 201 || response.status === 200) {
            user.salutation = 'none';
            user.firstName = '';
            user.lastName = '';
            user.email = '';
            user.password = '';
            user.country = 'none';
            user.confirmPassword = '';
            user.otherSalutationDetail = '';

            handleSuccess("User has been created successfully");
            console.info("User has been created successfully")
            return true;
        } else {
            handleError("User registration failed. Please try again later.");
        }
        return false;
    } catch (error) {
        if (error !== undefined && error.response !== undefined) {
            if (error.response.status === 500) {
                handleError("Email already exists. Please try with another email.");
                return false;
            }

            console.error('Error:', error);
            handleError("An error occurred. Please try again later.");
            return false;
        } else {
            handleSuccess("User has been created successfully");
            return true;
        }
    }
}

/**
 * Logs in a user
 */
export async function login(email, password) {
    try {
        const formData = {
            email: email,
            password: password
        };

        const response = await EndpointService.post("auth/login", formData);
        const store = useAppStore();
        if (response.status === 200) {
            store.logIn(response.data.token);
            localStorage.setItem('auth_token', response.data.token);
            return true;
        } else {
            handleError(`Login failed. Please try again later.`);
        }
    } catch (error) {
        handleError("An error occurred. Please try again later.");
        return false;
    }
}
