import pool from "../../src/config/db.js";

// create
export const createProduk = async (req, res) => {
  try {
    
    const { categories_id, name, price, stock, description } = req.body;
    await pool.query(
      "INSERT INTO produks (categories_id, name, price, stock, description) VALUES (?,?,?,?,?)",
      [categories_id, name, price, stock, description],
    );
     
    return res.status(200).json({
      status:true,
      message: "product is added"
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: error.message
    })
  }
};
// read
export const getAllProduk = async (req, res) => {
  try {
    const products = await pool.query(
      "SELECT produks.*, categories.name AS category_name FROM produks LEFT JOIN categories ON produks.categories_id = categories.id",
    );
    return res.status(200).json({
      status: true,
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};
// update
export const updateProduct = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { category_id, name, price, stock, description, is_active } =
      req.body;
    await pool.query(
      "UPDATE produks SET category_id=?, name=?, price=?, stock=?, decsription=?, is_active=? WHERE id=?",
      [category_id, name, price, stock, description, is_active ?? 1, id],
    );
    return res.status(200).json({
      status: true,
      message: "Update is success",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

export const getOneData = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const [product] = await pool.query(
      "SELECT produks.*, categories.name AS category_name FROM produks LEFT JOIN categories ON produks.categories_id = categories.id WHERE produks.id=?",
      [id],
    );
    return res.status(200).json({
      status: true,
      total: product.lenght,
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};
// delete
export const deleteProduct = async (req, res) =>{
  try {
    const id = parseInt(req.params.id);
    await pool.query("DELETE FROM produks WHERE id=?", [id]);
    return res.status(200).json({
      status: true,
      message: "Delete is Success",
    })
  } catch (error) {
    return res.status(500).json({
      status:false,
      error: error.message,
    })
  }
}