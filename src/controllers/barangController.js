const Produk = [
  {
    id: 1,
    nama: "HP",
  },

  {
    id: 2,
    nama: "PC",
  },
  {
    id: 3,
    nama: "keyboard",
  },
];

// read barng
export const barang = (req, res) => {
  return res.status(200).json({
    status: true,
    message: "berhasil",
    data: Produk,
  });
};

// create barang
export const createBarang = (req, res) => {
  const nama = req.body.nama;

  try {
    const barangBaru = {
      id: Produk.length > 0 ? Produk[Produk.length - 1].id + 1 : 1,
      nama,
    };
  } catch (error) {}
};
