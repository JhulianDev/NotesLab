// Esta función valida el usuario, correo electrónico y contraseña proporcionados por el usuario
// Recibe como argumentos el modelo de usuario, el nombre de usuario, correo electrónico y contraseña
export const validateUserEmailPassword = async (UserModel, user_name, email, password) => {

    const errors = {};// Objeto para almacenar los errores de validación

    // Validar que se proporcionen todos los campos requeridos
    if (!user_name || !email || !password) {
        errors.message = "Not all required fields are provided";
    }

    // Validar que la contraseña tenga la longitud requerida
    if (password.length < 6 || password.length > 30) {
        errors.message = "Password must be between 6 and 30 characters";
    }

    // Validar que el nombre de usuario contenga solo letras, números y tenga una longitud mínima de 3 caracteres
    const userNameRegex = /^[a-zA-Z0-9]{3,}$/;
    if (!userNameRegex.test(user_name)) {
        errors.message = "Username must contain only letters and numbers and have a minimum length of 3 characters";
    }

    // Validar que el correo electrónico tenga el formato adecuado
    const emailRegex = /^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) {
        errors.message = "The email provided is not valid";
    }

    // Buscar si ya existe un usuario en la base de datos con el correo electrónico proporcionado 
    const existingEmail = await UserModel.findOne({ where: { email } });
    if (existingEmail) {
        errors.message = "A user with this email already exists";
    }

    // Buscar si ya existe un usuario en la base de datos con el nombre de usuario proporcionado 
    const existingUserName = await UserModel.findOne({ where: { user_name } });
    if (existingUserName) {
        errors.message = "A user with this username already exists";
    }

    // Devolver los errores de validación, si los hay
    // Si no hay errores, devolver null
    return Object.keys(errors).length ? errors : null;
};
