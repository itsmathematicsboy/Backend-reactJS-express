import pool from "../../src/config/db.js";

const USERS = [
  {
    id:1,
    nama: "Budi",
    email: "budi@gmail.com",
    password: "admin1234",
  },
  {
    id:2, 
    nama: "Andi",
    email: "andi@gmail.com",
    password: "admin5678",
  },
  {
    id:3,
    nama: "Dira",
    email: "dira@gmail.com",
    password: "admin1221",
  },
];


// crud (create, read, update, delete)

export const getAllUser = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT id, name, email, is_active FROM users");
        return res.status(200).json({
            status: true, 
            message: "Fetch user success",
            total : rows.length,
            data: rows,
        })
    } catch (error) {
        return res.status(500).json({
            status: false, 
            message: "Fail Fetch user",
            error: error.message,
        })
    }
}

export const getUserById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const user = await pool.query("SELECT id, name, email, is_active FROM users WHERE id= ?", [id]);
        if(!user){
            res.status(404).json({
                status: false,
                message: "User not found",
            });
        }
    
        res.status(200).json({
            status:true,
            message: "User Found",
            data: user,
        })
        
    } catch (error) {

        res.status(500).json({
            status:false,
            message: "Fail Fetch User",
            error: error.message,
        })
    }
};

export const createUser = async (req, res) => {
    const {nama, email, password} = req.body;
    // const name = req.body.name;
    // const password = req.body.password;

    try {
        const [user] = await pool.query("INSERT INTO users(name, email, password) VALUES (?, ?, ?)", [name, email, password]);
    
        // USERS.push(newUser);
        return res.status(201).json({
            status:true,
            message: 'Create user success',
            data: {id : user.insertId,nama, email},
        });

    } catch (error) {
        return res.status(500).json({
            status:true,
            message: 'Create user failed',
            error: error.message,
        });
        
    }
};

export const updateUser = async (req, res) => {
    const id = parseInt(req.params.id);
    const {nama, email, password} = req.body;

    const [user] = await pool.query("UPDATE users SET name=?, email=?, password=? WHERE id=?", [name, email, password, id]);
    // USERS[userindex] = {
    //     ...USERS[userIndex],
    //     ...USERS(nama && {nama}),
    //     ...USERS(email && {email}),
    //     ...USERS(password && {password}),
    // }

    return res.status(200).json({
        status: true,
        message: 'Update user success',
        data: user,
    });

}

export const deleteUser = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const [userIndex] = await pool.query("DROP TABLE users WHERE name=?, email=?, password=? WHERE id=?",[name, email, password, id]);
    
            return res.status(404).json({
                status: false,
                message: "User no found",
            });
    } catch (error) {
        return res.status(200).json({
            status: true,
            message: "Delete user success",
        });
    }

    // const deletedUser = USERS.splice(userIndex, 1)[0];
};