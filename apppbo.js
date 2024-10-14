const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pertemuan5'
});

connection.connect((err) => {
    if (err) {
        console.error("Terjadi kesalahan dalam koneksi ke MySQL", err.stack);
        return;
    }
    console.log("Koneksi MySQL berhasil dengan id " + connection.threadId);
});

app.set('view engine', 'ejs');

// Kelas dasar MenuItem menggunakan inheritance dan polimorfisme
class MenuItem {
    constructor(nama, harga, kategori) {
        this.nama = nama;
        this.harga = harga;
        this.kategori = kategori;
    }

    // Polimorfisme: Method yang dapat di-overwrite di subclass
    getInfo() {
        return `${this.nama} - Rp${this.harga.toFixed(2)} (${this.kategori})`;
    }
}

class Pembuka extends MenuItem {
    constructor(nama, harga) {
        super(nama, harga, 'Pembuka');
        this.ukuranPorsi = 'Kecil';
    }

    // Polimorfisme: Overwrite method getInfo
    getInfo() {
        return `${super.getInfo()} - Porsi: ${this.ukuranPorsi}`;
    }
}

class HidanganUtama extends MenuItem {
    constructor(nama, harga) {
        super(nama, harga, 'Hidangan Utama');
        this.masakan = 'Laut';
    }

    // Polimorfisme: Overwrite method getInfo
    getInfo() {
        return `${super.getInfo()} - Masakan: ${this.masakan}`;
    }
}

class Penutup extends MenuItem {
    constructor(nama, harga) {
        super(nama, harga, 'Penutup');
        this.isVegan = false;
    }

    // Polimorfisme: Overwrite method getInfo
    getInfo() {
        return `${super.getInfo()} - ${this.isVegan ? 'Vegan' : 'Non-Vegan'}`;
    }
}

// CRUD REST API untuk restoran
// READ: Tampilkan semua menu
app.get('/', (req, res) => {
    const query = 'SELECT * FROM menu';
    connection.query(query, (err, results) => {
        if (err) throw err;
        res.render('index', { menus: results });
    });
});

// CREATE: Tambah item menu
app.post('/add', (req, res) => {
    const { nama, harga, kategori } = req.body;
    let newItem;

    // Polimorfisme: Menentukan jenis item berdasarkan kategori
    if (kategori === 'Pembuka') {
        newItem = new Pembuka(nama, parseFloat(harga));
    } else if (kategori === 'Hidangan Utama') {
        newItem = new HidanganUtama(nama, parseFloat(harga));
    } else if (kategori === 'Penutup') {
        newItem = new Penutup(nama, parseFloat(harga));
    }

    const query = 'INSERT INTO menu (nama, harga, kategori) VALUES (?, ?, ?)';
    connection.query(query, [newItem.nama, newItem.harga, newItem.kategori], (err, results) => {
        if (err) throw err;
        res.redirect('/');
    });
});

// UPDATE: Ambil data item yang ingin di-edit
app.get('/edit/:id', (req, res) => {
    const query = 'SELECT * FROM menu WHERE id = ?';
    connection.query(query, [req.params.id], (err, result) => {
        if (err) throw err;
        res.render('edit', { menu: result[0] });
    });
});

// UPDATE: Perbarui data item
app.post('/update/:id', (req, res) => {
    const { nama, harga, kategori } = req.body;
    const query = 'UPDATE menu SET nama = ?, harga = ?, kategori = ? WHERE id = ?';
    connection.query(query, [nama, parseFloat(harga), kategori, req.params.id], (err, results) => {
        if (err) throw err;
        res.redirect('/');
    });
});

// DELETE: Hapus item dari menu
app.get('/delete/:id', (req, res) => {
    const query = 'DELETE FROM menu WHERE id = ?';
    connection.query(query, [req.params.id], (err, result) => {
        if (err) throw err;
        res.redirect('/');
    });
});

app.listen(3000, () => {
    console.log("Server berjalan di port 4000, buka web melalui http://localhost:3000");
});
