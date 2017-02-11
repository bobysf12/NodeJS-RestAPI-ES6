const schema = {
    
    // POST /api/auth/login
    login: {
        'username' : {
            notEmpty: true,
            errorMessage: 'Username cannot be empty'      
        },
        'password': {
            notEmpty: true,
            errorMessage: 'Password cannot be empty'
        }
    },
    
    // POST /api/auth/register
    register: {
        'username' : {
            notEmpty: true,
            errorMessage: 'Username cannot be empty'
        },
        'password': {
            notEmpty: true,
            errorMessage: 'Password cannot be empty'
        },
        'email': {
            isEmail: {
                errorMessage: 'Invalid email'
            },
            errorMessage: 'Email cannot be empty'
        },
        'name': {
            notEmpty: true,
            errorMessage: 'Name cannot be empty'
        }
    }
}

export default schema;