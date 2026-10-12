import pool from '../../src/config/db.js';

// create
export const createCategories = async(req,res)=>{
    const name = req.body.name;
    
    try {
        const rowCategories = await pool.query("INSERT into categories (name) VALUES  (?)", [name]);
        return res.status(201).json({
        status:true,
        message: "data berhasil ditambahkan",
       data:{id:rowCategories.insertId,name},
    });
    } catch (error) {
        if (error.code === ER_DUP_ENTRY) {
            return res.status(400).json({
                status:false,
                message:"category already exist"
            });
        }
     return res.status(500).json({
        status:false,
        message:"gagal",
        data:error.message
    });  
    }

};
// read
export const getAllCategories = async(req,res)=>{
try {
        const [rows] = await pool.query("SELECT id,name FROM categories");
        return res.status(200).json({
        status:true,
        message: "fetch user berhasil wokkkkkkk",
        total:rows.length,
        data: rows,
    });
        
    } catch (error) {
        return res.status(400).json({
        status:false,
        message: "fail fetch user",
        error: error.message,
    });
};
}

export const categoriesId  = async (req,res) => {
 const id = parseInt(req.params.id);;
 const [categoryIndex] = await pool.query("SELECT id,name FROM categories WHERE id = ?",[id]);
 const categories = categoryIndex[0];
  try {
    if (!categories) {
        res.status(404).json({
            status:false,
            message:"data gk ada wok",
            error:error.message,
        });
    }
    return res.status(200).json({
        status:true,
        data:categories
        
    });
  } catch (error) {
     res.status(500).json({
            status:false,
            error:error.message,
        });
    }
  };

// update
export const updateCategories =async (req,res)=>{
    const id = parseInt(req.params.id);
    const {name} = req.body;
    const categoryIndex = await pool.query ("UPDATE categories SET name = ? WHERE id = ?", [name, id]);
    try {
        return res.status(200).json({
            status:true,
            message:'update berhasil WOk',
            data:categoryIndex,
        });
        
    } catch (error) {
        return res.status(400).json({
            status:false,
            error:error.message,
        })
        
    };
};

// delete
export const deleteCategories = async(req,res)=>{

    const id = parseInt(req.params.id);

    try {
        // 1. Eksekusi query dengan mengirim array [id] saja & gunakan destructuring [result]
        const [result] = await pool.query("DELETE FROM categories WHERE id = ?", [id]);

        // 2. Cek apakah ada baris data yang terhapus
        if (result.affectedRows === 0) {
            return res.status(404).json({
                status: false,
                message: "data categories tidak ditemukan",
            });
        }

        // 3. Jika berhasil dihapus
        return res.status(200).json({
            status: true,
            message: "berhasil dihapus",
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Gagal menghapus delete",
            error: error.message,
        });
    }
}