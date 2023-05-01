import jwt from "jsonwebtoken"
import dotenv from 'dotenv';
dotenv.config();

// Este Middleware valida la autorización del usuario mediante el token JWT
export const validateAuthorization = (req, res, next) => {
  // Comprobamos si existe el token:
  // Si no existe devolvemos el error
  if (!req.headers.authorization) {
    res.status(401).json({ message: "No authorization token provided" });
    return;
  } else {
    // Si existe el token:
    // Guardamos el valor del token en una variable 
    let token = req.headers.authorization.split(" ")[1];
    // Comprobamos la validez del token
    // Si es invalido devolvemos el error
    // Si es valido se llama a la función next() 
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        console.error(`Error verifying token: ${error.message}`);
        res.status(403).json({ message: "Unauthorized access" });
        return;
      } else {
        // Agregamos los datos del usuario al objeto request (req)
        req.user = decoded.user;
        // Enviamos la respuesta con los datos del usuario en la respuesta tipo JSON
        // res.status(200).json({message: "Authorized", user: decoded.user});
        next();
      }
    })
  }
}