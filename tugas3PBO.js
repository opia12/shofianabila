class Kapal {
    constructor(nama, jenis, kapasitas, panjang, lebar) {
        this.nama = nama;
        this.jenis = jenis;
        this.kapasitas = kapasitas;
        this.panjang = panjang;
        this.lebar = lebar;
        this.siapBerlayar = false;
    }

    infoKapal() {
        return `Kapal ini bernama ${this.nama} dengan jenis ${this.jenis}. Kapal tersedia dengan kapasitas ${this.kapasitas} orang. Kapal memiliki dimensi dengan ukuran ${this.panjang} X ${this.lebar} meter.`;
    }

    setSiapBerlayar(status) {
        this.siapBerlayar = status;
    }

    getStatusBerlayar() {
        return this.siapBerlayar ? "Kapal siap berlayar." : "Kapal belum siap berlayar.";
    }
}

class KetersediaanKapal extends Kapal {
    constructor(nama, jenis, kapasitas, panjang, lebar) {
        super(nama, jenis, kapasitas, panjang, lebar);
        this.tersedia = true;
    }

    setKetersediaan(status) {
        this.tersedia = status;
    }

    getKetersediaan() {
        return this.tersedia ? "Kapal masih tersedia." : "Kapal sudah tidak tersedia.";
    }
}

class PemesananTiket extends KetersediaanKapal {
    constructor(nama, jenis, kapasitas, panjang, lebar) {
        super(nama, jenis, kapasitas, panjang, lebar);
        this.jumlahTiket = kapasitas;
    }

    pesanTiket(jumlah) {
        if (this.jumlahTiket >= jumlah && this.tersedia) {
            this.jumlahTiket -= jumlah;
            return `${jumlah} tiket berhasil di pesan. Tiket tersisa: ${this.jumlahTiket}`;
        } else {
            return "Pemesanan gagal. Tiket sold out atau kapal tidak tersedia.";
        }
    }

    getInfoTiket() {
        return `${this.infoKapal()} dan tiket masih tersedia sebanyak ${this.jumlahTiket}.`;
    }
}

class KelayakanKapal extends Kapal {
    #statusKelayakan; 

    constructor(nama, jenis, kapasitas, panjang, lebar) {
        super(nama, jenis, kapasitas, panjang, lebar);
        this._statusKelayakan = "Belum diperiksa";
    }

    periksaKelayakan(status) {
        this._statusKelayakan = status;
        this.setSiapBerlayar(status === "Layak beroperasi");
    }

    getStatusKelayakan() {
        return `Status kelayakan kapal ${this.nama}: ${this._statusKelayakan}`;
    }
}

let kapalPenumpang = new PemesananTiket("Budiono Siregar", "Ferry", 500, 200, 100);
console.log(kapalPenumpang.infoKapal());
console.log(kapalPenumpang.getStatusBerlayar());
console.log(kapalPenumpang.getKetersediaan());
console.log(kapalPenumpang.pesanTiket(50));
console.log(kapalPenumpang.getInfoTiket());

let kapalKargo = new KelayakanKapal("Muatan Sejahtera", "Kargo", 1000, 300, 150);
kapalKargo.periksaKelayakan("Layak beroperasi.");
console.log(kapalKargo.getStatusKelayakan());
console.log(kapalKargo.getStatusBerlayar());

