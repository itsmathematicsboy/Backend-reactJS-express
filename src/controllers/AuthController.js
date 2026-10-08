const USERS = [
    {
        nama: "ABC",
        email: "admin@gmail.com",
        password: "admin1234",
    },
];

export const login = (req, res) => {
    const {email, password} = req.body;

    if(!email || !password){
        res.status(400).json({
            status: false,
            message: "Email atau password required"
        });
    }

    const user = USERS.find((u) => u.email === email && u.password === password);

    if(!user){
        return res.status(401).json({
          status: false,
          message: "Invalid login",
        });
    }
    res.status(200).json({
      status: true,
      message: "berhasil",
      data:{
        user: {
            id: user.id,
            name: user.nama,
            email: user.email,
        },
        token: `jwt-token-123 ${user.id} - ${Date.now()}`
      }
    });
}