# Bookshelf-App

## Aplikasi Rak Buku Virtual dengan Pengelolaan Data Menggunakan DOM dan Web Storage
Website javascript responsif dengan fitur utama menambah buku, menandai belum dibaca, menghapus buku, dan mencari buku.  
Link GitHub: [Bookshelf App](https://alfikiafan.github.io/Bookshelf-App/)
 
## Fitur 1: Menambahkan Data Buku
Bookshelf Apps memiliki fitur yang memungkinkan pengguna untuk menambahkan data buku baru. Data buku yang ditambahkan disimpan dalam objek JavaScript dengan struktur sebagai berikut:

    {
    id: string | number,
    title: string,
    author: string,
    year: number,
    isComplete: boolean,
    }
    
## Fitur 2: Memiliki Dua Rak Buku

-   Bookshelf Apps **memiliki** **2** **rak buku**. Yakni, “Belum selesai dibaca” dan “Selesai dibaca”.
-   Rak buku "Belum selesai dibaca" hanya menyimpan buku jika properti  isComplete  bernilai  _false_.
-   Rak buku "Selesai dibaca" hanya menyimpan buku jika properti  isComplete  bernilai  _true_.

## Fitur 3: Dapat Memindahkan Buku Antar-Rak

-   Buku yang ditampilkan pada rak, baik itu "Belum selesai dibaca" maupun "Selesai dibaca"  **dapat dipindahkan di antara keduanya**.

## Fitur 4: Dapat Menghapus Data Buku

-   Buku yang ditampilkan pada rak, baik itu "Belum selesai dibaca" maupun "Selesai dibaca"  **dapat dihapus**.

## Fitur 5: Memanfaatkan localStorage dalam Menyimpan Data Buku

-   Dengan localStorage, data buku yang ditampilkan pada rak, baik itu "Belum selesai dibaca" maupun "Selesai dibaca"  **dapat bertahan walaupun halaman web ditutup**.
