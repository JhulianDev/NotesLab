import { validateUserEmailPassword } from '../helpers/helper.js';
import UserModel from "../models/UserModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from 'dotenv';
dotenv.config();

// Register
export const register = async (req, res) => {

  try {
    const { user_name, email, password } = req.body;

    // Validamos que se proporcionen todos los campos requeridos
    if (!user_name || !email || !password) {
      res.status(400).json({ message: "Not all required fields are provided" });
      return;
    }

    // Validamos los datos ingresados por el usuario
    const errors = await validateUserEmailPassword(UserModel, user_name, email, password);

    // Si hay errores:
    // Devolvemos un error 400 y los mensajes de error
    // Detenemos la ejecucion del codigo
    if (errors) {
      res.status(400).json(errors);
      console.log(errors);
      return;
    }

    // Si no hay errores: 
    // Generamos el hash de la contraseña
    let hashedPassword = bcrypt.hashSync(req.body.password, Number.parseInt(process.env.JWT_ROUNDS));

    // Creamos el usuario en la base de datos
    const user = await UserModel.create({
      user_name: req.body.user_name,
      email: req.body.email,
      password: hashedPassword
    });

    // Generamos el JWT para el usuario
    let token = jwt.sign({ user: user }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION
    });

    // Devolvemos los datos del usuario y el token generado
    res.status(201).json({
      message: "The user was created successfully!",
      user: {
        id: user.id,
        user_name: user.user_name,
        email: user.email
      },
      token: token,
    });

    console.log("¡User registered!");
  } catch (error) {
    console.log(`An error occurred while trying to create the user: ${error}`)
    res.status(500).json(`An error occurred while trying to create the user`)
  }
}

// Login
export const login = async (req, res) => {

  try {
    const { user_name, password } = req.body;

    // Validamos que se proporcionen todos los campos requeridos
    if (!user_name || !password) {
      res.status(400).json({ message: "Not all required fields are provided" });
      return;
    }
    // Comprobamos si existe el usuario en la base de datos.
    // Si no existe, detenemos la ejecucion del codigo.
    const user = await UserModel.findOne({ where: { user_name } });
    if (!user) {
      res.status(401).json({ message: "Invalid User name or password" });
      return;
    }

    // De existir el usuario:
    // Comprobamos si la contraseña enviada coincide con la contraseña guardada.
    // Si no coincide, detenemos la ejecucion del codigo.
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.status(401).json({ message: "Invalid User name or password" });
      return;
    }

    // Si el usuario y contraseña son correctos:
    // Generamos el JWT para el usuario:
    let token = jwt.sign({ user: user }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION
    });

    // Devolvemos los datos correspondientes al usuario
    res.status(200).json({
      message: "¡Successful login!",
      user: {
        id: user.id,
        user_name: user.user_name,
        email: user.email
      },
      token: token
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }

}

// Get user
export const getUser = async (req, res) => {
  try {
    let user = await UserModel.findOne({ where: { id: req.user.id } })
    if (user) {
      res.json({
        message: "User found successfully!",
        user: {
          id: user.id,
          user_name: user.user_name,
          email: user.email
        }
      });
    } else {
      res.json("User not found")
    }
  } catch (error) {
    res.status(500).json({ message: "Error getting user" })
  }
}
