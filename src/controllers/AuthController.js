import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import pool from "../config/db.js";


const USERS = [
    {
        nama: "ABC",
        email: "admin@gmail.com",
        password: "admin1234",
    },
];

export const login = async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password){
        res.status(400).json({
            status: false,
            message: "Email atau password required"
        });
    }

    // const user = USERS.find((u) => u.email === email && u.password === password);

    const [user] = await pool.query("SELECT id, name, email, password FROM users WHERE email=?", [email]);

    if(user.length === 0){
        return res.status(401).json({
          status: false,
          message: "Invalid login",
        });
    }

    const dataUser = user[0];
    const isMatch = await bcrypt.compare(password, dataUser.password);

    if(!isMatch){
        return res.status(401).json({
          status: false,
          message: "Invalid login",
        });
    }

    const token = jwt.sign({
        id: dataUser.id,
        email : dataUser.email,
        }, 
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRES_IN || '1d'}
    );
    // if(!user){
    //     return res.status(401).json({
    //       status: false,
    //       message: "Invalid login",
    //     });
    // }
    res.status(200).json({
      status: true,
      message: "berhasil",
      data:{
        user: {
            id: dataUser.id,
            name: dataUser.nama,
            email: dataUser.email,
        },
        token,
      }
    });
}