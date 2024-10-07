class Kapal {  
    //super class untuk mendefenisikan porperti dan method setiap jenis kapal.
    _siapBerlayar;
    // private field yang hanya dapat diakses di kelas kapal, dan tersedia untuk semua metodenya.

    constructor(nama, jenis, kapasitas, panjang, lebar) {
        // menginisialisasi properti kapal dengan properti nama, jenis, kapasitas, panjang, lebar.
        this.nama = nama;
        this.jenis = jenis;
        this.kapasitas = kapasitas;
        this.panjang = panjang;
        this.lebar = lebar;
        this._siapBerlayar = false; // Private field untuk mendeklarasikan kesiapan kapal dalam berlayar.
    }
// method
    infoKapal() {
        // output informasi kapal secara umum.
        return `Kapal ini bernama ${this.nama} dengan jenis ${this.jenis}. Kapal tersedia dengan kapasitas ${this.kapasitas} orang. Kapal memiliki dimensi dengan ukuran ${this.panjang} X ${this.lebar} meter.`;
    }

    setSiapBerlayar(status) {
        // pengaturan kesiapan perlayaran kapal menggunakan private field.
        this._siapBerlayar = status;
    }

    getStatusBerlayar() {
        // output informasi kapal kesiapan kapal untuk berlayar.
        return this._siapBerlayar ? "Kapal siap berlayar." : "Kapal belum siap berlayar.";
    }
}

class KetersediaanKapal extends Kapal {
    // kelas pelengkap dari kapal untuk memberikan informasi  mengenai ketersediaan kapal.
    _tersedia;

    constructor(nama, jenis, kapasitas, panjang, lebar) {
        super(nama, jenis, kapasitas, panjang, lebar);
        this._tersedia = true; // Private field
    }
// method
    setKetersediaan(status) {
        this._tersedia = status;
        // mengatur status ketersediaan kapal.
    }

    getKetersediaan() {
        return this._tersedia ? "Kapal masih tersedia." : "Kapal sudah tidak tersedia.";
        // output informasi status ketersediaan kapal.

    }
}

class PemesananTiket extends KetersediaanKapal {
    // kelas pelengkap dari ketersediaan kapal untuk melakukan pemesanan tiket setelah informasi ketersediaan kapal diketahui.
    _jumlahTiket;

    constructor(nama, jenis, kapasitas, panjang, lebar) {
        super(nama, jenis, kapasitas, panjang, lebar);
        this._jumlahTiket = kapasitas; // Private field
    }
// method
    pesanTiket(jumlah) {
        if (this._jumlahTiket >= jumlah && this._jumlahTiket > 0) {
            this._jumlahTiket -= jumlah;
            return `${jumlah} tiket berhasil dipesan. Tiket tersisa: ${this._jumlahTiket}`;
        } else {
            return "Pemesanan gagal. Tiket sold out atau kapal tidak tersedia.";
        }
    }
// memproses pemesanan tiket.
    getInfoTiket() {
        return `${this.infoKapal()} dan tiket masih tersedia sebanyak ${this._jumlahTiket}.`;
    // mengeluarkan output terkait info ketersediaan tiket.
}
}

class KelayakanKapal extends Kapal {
    // kelas pelengkap dari kapal untuk memberikan informasi  mengenai kelayakan kapal untuk berlayar.
    _statusKelayakan;

    constructor(nama, jenis, kapasitas, panjang, lebar) {
        super(nama, jenis, kapasitas, panjang, lebar);
        this._statusKelayakan = "Belum diperiksa"; // Private field
    }

    periksaKelayakan(status) {
        this._statusKelayakan = status;
        this.setSiapBerlayar(status === "Layak beroperasi");
    } // melakukan pemeriksaan dan pengaturan terhadap status kelayakan kapal.

    getStatusKelayakan() {
        return `Status kelayakan kapal ${this.nama}: ${this._statusKelayakan}`;
    } // menginformasikan terhadap status kelayakan kapal 
}

// Kelas tambahan untuk polymorphism
class KapalPesiar extends Kapal {
    // pewarisan dari kelas kapal untuk kapal pesiar.
    constructor(nama, kapasitas, panjang, lebar) {
        super(nama, "Kapal Pesiar", kapasitas, panjang, lebar);
         // Memanggil constructor kelas induk (Kapal) dengan jenis "Kapal Pesiar"
    }

    infoKapal() {
        // Override metode infoKapal untuk memberikan informasi kapal pesiar secara spesifik.
        return `Kapal Pesiar ${this.nama} memiliki kapasitas ${this.kapasitas} penumpang dan dimensi ${this.panjang} X ${this.lebar} meter.`;
    }

    getStatusBerlayar() {
        //  memberikan pesan kapal pesiar secara spesifik.
        return super.getStatusBerlayar() ? "Kapal Pesiar ini siap untuk pelayaran mewah." : "Kapal Pesiar ini belum siap berlayar.";
        // Pemanggilan metode dari kelas induk.

    }
}

class KapalIkan extends Kapal {
    // Warisan dari kelas kapal untuk mendefinisikan kapal ikan.
    _jenisIkan;

    constructor(nama, kapasitas, panjang, lebar, jenisIkan) {
        super(nama, "Kapal Ikan", kapasitas, panjang, lebar);
        // Memanggil constructor kelas induk (Kapal) dengan jenis "Kapal Ikan"
        this._jenisIkan = jenisIkan; 
        // Menyimpan jenis ikan sebagai properti privat
    }
    
    infoKapal() {
        // Override metode infoKapal untuk memberikan informasi kapal pesiar secara spesifik.
        return `Kapal Ikan ${this.nama} menangkap jenis ikan ${this._jenisIkan} dengan kapasitas penyimpanan ${this.kapasitas} ton. Ukuran kapal: ${this.panjang} X ${this.lebar} meter.`;
    }

    tangkapIkan(jumlahIkan) {
        return `Berhasil menangkap ${jumlahIkan} ton ikan ${this._jenisIkan}.`;
         // Pemanggilan metode dari kelas induk.
    }
}

class KapalTanker extends Kapal {
    // Mendefinisikan kelas KapalTanker yang mewarisi dari kelas Kapal
    _jenisMuatan;
    // Properti privat untuk menyimpan jenis muatan

    constructor(nama, kapasitas, panjang, lebar, jenisMuatan) {
        super(nama, "Kapal Tanker", kapasitas, panjang, lebar);
        // Memanggil constructor kelas induk (Kapal) dengan jenis "Kapal Tanker"

        this._jenisMuatan = jenisMuatan; // Private field
    }

    infoKapal() {
    // Override metode infoKapal untuk memberikan informasi spesifik kapal tanker
        return `Kapal Tanker ${this.nama} membawa muatan ${this._jenisMuatan} dengan kapasitas ${this.kapasitas} ton. Dimensi kapal: ${this.panjang} X ${this.lebar} meter.`;
    }

    muatKargo(jumlahMuatan) {
        // method khusus untuk kelas kapal
        return `Kapal Tanker memuat ${jumlahMuatan} ton muatan ${this._jenisMuatan}.`;
    }
}

class KapalCepat extends Kapal {
    // Mendefinisikan kelas KapalCepat yang mewarisi dari kelas Kapal

    constructor(nama, kapasitas, panjang, lebar) {
        super(nama, "Kapal Cepat", kapasitas, panjang, lebar);
        // Memanggil constructor kelas induk (Kapal) dengan jenis "Kapal Cepat"
    }

    infoKapal() {
        // Override metode infoKapal untuk memberikan informasi spesifik kapal cepat
        return `Kapal Cepat ${this.nama} dengan kapasitas ${this.kapasitas} orang siap membawa penumpang ke tujuan dengan kecepatan tinggi. Dimensi: ${this.panjang} X ${this.lebar} meter.`;
    }

    getStatusBerlayar() {
        // Override metode getStatusBerlayar untuk memberikan pesan spesifik kapal cepat
        return super.getStatusBerlayar() ? "Kapal cepat siap berangkat dengan kecepatan tinggi." : "Kapal cepat belum siap berangkat.";
        // Menggunakan super.getStatusBerlayar() untuk memanggil metode dari kelas induk
    }
}

class KapalLayar extends Kapal {
    // Mendefinisikan kelas KapalLayar yang mewarisi dari kelas Kapal
    constructor(nama, kapasitas, panjang, lebar) {
        super(nama, "Kapal Layar", kapasitas, panjang, lebar);
    // Memanggil constructor kelas induk (Kapal) dengan jenis "Kapal Layar"
    }

    infoKapal() {
        // Override metode infoKapal untuk memberikan informasi spesifik kapal layar
        return `Kapal Layar ${this.nama} memiliki kapasitas ${this.kapasitas} penumpang dengan dimensi ${this.panjang} X ${this.lebar} meter. Kapal ini menggunakan layar untuk berlayar.`;
    }

    getStatusBerlayar() {
        // Override metode getStatusBerlayar untuk memberikan pesan spesifik kapal layar
        return super.getStatusBerlayar() ? "Kapal layar siap menjelajah lautan." : "Kapal layar belum siap untuk berlayar.";
        // Menggunakan super.getStatusBerlayar() untuk memanggil metode dari kelas induk
    }
}

// Contoh penggunaan class dan polymorphism
let kapalPenumpang = new PemesananTiket("Budiono Siregar", "Ferry", 500, 200, 100);
// Membuat instance dari kelas PemesananTiket (yang merupakan turunan dari Kapal)

console.log(kapalPenumpang.infoKapal());
// Menampilkan informasi kapal penumpang
console.log(kapalPenumpang.getStatusBerlayar());
// Menampilkan status berlayar kapal penumpang
console.log(kapalPenumpang.getKetersediaan());
// Menampilkan ketersediaan kapal penumpang
console.log(kapalPenumpang.pesanTiket(50));
// Memesan 50 tiket dan menampilkan hasilnya
console.log(kapalPenumpang.getInfoTiket());
// Menampilkan informasi tiket terbaru

let kapalKargo = new KelayakanKapal("Muatan Sejahtera", "Kargo", 1000, 300, 150);
// Membuat instance dari kelas KelayakanKapal (yang merupakan turunan dari Kapal)

kapalKargo.periksaKelayakan("Layak beroperasi");
// Memeriksa kelayakan kapal kargo
console.log(kapalKargo.getStatusKelayakan());
// Menampilkan status kelayakan kapal kargo
console.log(kapalKargo.getStatusBerlayar());
// Menampilkan status berlayar kapal kargo

// Polymorphism dengan berbagai jenis kapal
let armadaKapal = [
    new KapalPesiar("Sunrise Cruise", 1000, 250, 50),
    new KapalIkan("Penangkap Tuna", 300, 150, 40, "Tuna"),
    new KapalTanker("Energy Transport", 2000, 300, 70, "Minyak Mentah"),
    new KapalCepat("Thunder Speed", 150, 50, 10),
    new KapalLayar("Wind Wanderer", 30, 20, 8),
];
// Membuat array berisi berbagai jenis kapal, mendemonstrasikan polymorphism

armadaKapal.forEach(kapal => {
    console.log(kapal.infoKapal());
    console.log(kapal.getStatusBerlayar());
});
// Iterasi melalui setiap kapal dalam armada, menampilkan info dan status berlayar
// Ini menunjukkan polymorphism karena metode yang sama dipanggil pada objek berbeda

// Contoh interaksi dengan method khusus
let kapalTanker = new KapalTanker("Ocean Carrier", 5000, 350, 90, "Gas Cair");
console.log(kapalTanker.muatKargo(3000));
// Membuat instance KapalTanker dan menggunakan metode khususnya (muatKargo)

let kapalIkan = new KapalIkan("Catch Master", 200, 100, 30, "Salmon");
console.log(kapalIkan.tangkapIkan(150));
// Membuat instance KapalIkan dan menggunakan metode khususnya (tangkapIkan)