import * as Yup from 'yup';

/**
 * Registration Schema Validation using Yup.
 *
 * @see services/user/UserRegisterService.js
 * @property {string} salutation - The Salutation must not be empty.
 * @property {string} otherSalutationDetail - The other salutation detail must not be empty if the salutation is OTHER.
 * @property {string} firstName - The first name must not be empty.
 * @property {string} lastName - The last name must not be empty.
 * @property {string} email - The email must not be empty and must be a valid email.
 * @property {string} password - The password must not be empty and must be at least 8 characters long.
 * @property {string} confirmPassword - The confirm password must not be empty and must match the password.
 * @property {string} country - The country must not be empty.
 */
const registrationSchema = Yup.object().shape({
    salutation: Yup.string().required('Salutation is required').nullable(),
    otherSalutationDetail: Yup.string()
        .test({
            name: 'salutation-detail',
            test: function(value) {
                const salutation = this.resolve(Yup.ref('salutation'));
                if (salutation === 'OTHER') {
                    return value !== undefined && value !== '';
                }
                return true;
            },
            message: 'Please specify your salutation',
        })
        .nullable(),
    firstName: Yup.string().required('First name is required').min(2, 'First Name is too Short!').max(20, 'First Name is too Long!'),
    lastName: Yup.string().required('Last name is required').min(2, 'Last Name is too Short!').max(20, 'Last Name is too Long!'),
    email: Yup.string().required('Email is required').email('Invalid email'),
    password: Yup.string()
        .required('Password is required')
        .min(12, 'Password must be at least 12 characters long')
        .matches(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).*$/,
            'Password must contain at least one number, one lowercase letter, one uppercase letter, and one symbol (@#$%^&+=!)'
        ),
    confirmPassword: Yup.string()
        .required('Confirm password is required')
        .test({
            name: 'password-match',
            test: function(value) {
                const password = this.resolve(Yup.ref('password'));
                return password === value;
            },
            message: 'Passwords do not match',
        }),
    country: Yup.string().required('Country is required').nullable(),
});

export default registrationSchema;
