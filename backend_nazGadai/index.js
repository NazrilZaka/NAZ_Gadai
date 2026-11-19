require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise'); // Menggunakan versi Promise agar mendukung async/await
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Middleware Logger agar setiap request tercatat di CMD
app.use((req, res, next) => {
  const waktu = new Date().toLocaleTimeString();
  console.log(`[${waktu}] ${req.method} ${req.url}`);
  next();
});

// 1. KONFIGURASI KONEKSI DATABASE (Connection Pool)
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Cek apakah koneksi ke MySQL berhasil saat server pertama kali menyala
db.getConnection()
  .then(conn => {
    console.log('Berhasil terhubung ke database MySQL (db_naz_gadai)!');
    conn.release();
  })
  .catch(err => {
    console.error('Gagal terhubung ke MySQL:', err.message);
  });

// ... (Bagian import, cors, dan koneksi database milikmu tetap dipertahankan) ...

// 2. READ: Ambil semua data gadai (Cocok dengan renderRiwayat)
app.get('/api/gadai', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM transaksi_gadai ORDER BY tanggal_masuk DESC');
    res.json(rows); // Frontend biasanya langsung membaca array dari response.json()
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 3. CREATE: Simpan transaksi gadai baru (Cocok dengan transactionForm.submit)
app.post('/api/gadai', async (req, res) => {
  try {
    // Destructuring semua data yang dikirim dari frontend
    const { 
      id, nama_nasabah, no_wa, kategori, jenis_transaksi, 
      nilai_pinjaman, bunga_margin, tanggal_masuk, tanggal_keluar, status 
    } = req.body;

    const sql = `INSERT INTO transaksi_gadai 
      (id, nama_nasabah, no_wa, kategori, jenis_transaksi, nilai_pinjaman, bunga_margin, tanggal_masuk, tanggal_keluar, status) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      
    await db.query(sql, [
      id, nama_nasabah, no_wa, kategori, jenis_transaksi, 
      nilai_pinjaman, bunga_margin, tanggal_masuk, tanggal_keluar, status
    ]);

    res.status(201).json({ success: true, message: 'Transaksi berhasil disimpan!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 4. UPDATE: Edit, Tebus, atau Update Jatuh Tempo (Cocok dengan btnTebusBarang & editTransactionForm)
app.put('/api/gadai/:id', async (req, res) => {
  try {
    const idDicari = req.params.id;
    // Frontend akan mengirim seluruh objek data yang sudah diubah
    const { 
      nama_nasabah, no_wa, kategori, jenis_transaksi, 
      nilai_pinjaman, bunga_margin, tanggal_keluar, status 
    } = req.body;

    const sql = `UPDATE transaksi_gadai SET 
      nama_nasabah = ?, no_wa = ?, kategori = ?, jenis_transaksi = ?, 
      nilai_pinjaman = ?, bunga_margin = ?, tanggal_keluar = ?, status = ? 
      WHERE id = ?`;
      
    const [result] = await db.query(sql, [
      nama_nasabah, no_wa, kategori, jenis_transaksi, 
      nilai_pinjaman, bunga_margin, tanggal_keluar, status, idDicari
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Transaksi tidak ditemukan' });
    }

    res.json({ success: true, message: 'Data berhasil diperbarui!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 5. DELETE: Hapus transaksi (Cocok dengan btnHapusTrx)
app.delete('/api/gadai/:id', async (req, res) => {
  try {
    const idDicari = req.params.id;
    const [result] = await db.query('DELETE FROM transaksi_gadai WHERE id = ?', [idDicari]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Transaksi tidak ditemukan' });
    }

    res.json({ success: true, message: 'Transaksi berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server aktif di http://localhost:${PORT}`);
});