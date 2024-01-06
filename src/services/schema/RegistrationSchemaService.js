import * as Yup from 'yup';

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
    password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters long'),
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
