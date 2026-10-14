// Memastikan seluruh HTML selesai dimuat sebelum menjalankan script
document.addEventListener("DOMContentLoaded", function() {

    // --- 1. AMBIL SEMUA ELEMEN HTML YANG DIBUTUHKAN ---
    // MENGAMBIL FOTO DARI CLASS BARU (.item-rapat) BUKAN (.card-img)
    const semuaFotoRapat = document.querySelectorAll('.item-rapat'); 
    const tombolFilter = document.querySelectorAll('.btn-filter');

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxJudul = document.getElementById('lightbox-judul');
    const lightboxTanggal = document.getElementById('lightbox-tanggal');
    const lightboxDownload = document.getElementById('lightbox-download');
    const btnTutup = document.querySelector('.btn-tutup');


    // --- 2. LOGIKA FILTER KATEGORI (Opsional, jika nanti tombolnya ditambah) ---
    if (tombolFilter.length > 0) {
        tombolFilter.forEach(tombol => {
            tombol.addEventListener('click', function() {
                
                tombolFilter.forEach(t => t.classList.remove('aktif'));
                this.classList.add('aktif');

                const kategoriPilihan = this.getAttribute('data-filter');

                semuaFotoRapat.forEach(foto => {
                    if (kategoriPilihan === 'semua' || foto.classList.contains(kategoriPilihan)) {
                        foto.classList.remove('sembunyi'); 
                    } else {
                        foto.classList.add('sembunyi'); 
                    }
                });
            });
        });
    }


    // --- 3. LOGIKA LIGHTBOX (KLIK PERBESAR GAMBAR UNTUK GALERI RAPAT) ---
    if (lightbox && btnTutup) {
        
        semuaFotoRapat.forEach(foto => {
            foto.addEventListener('click', function() {
                
                // Cari elemen gambar 
                const imgEl = this.querySelector('img');
                
                // Cari elemen judul (h3) dan tanggal (p) dari DALAM div .data-sembunyi
                const judulEl = this.querySelector('.data-sembunyi h3');
                const tanggalEl = this.querySelector('.data-sembunyi p');

                if (imgEl) {
                    const imgSrc = imgEl.src;
                    const judulFoto = judulEl ? judulEl.innerText : 'Tanpa Judul';
                    const tanggalFoto = tanggalEl ? tanggalEl.innerText : '';

                    // Masukkan data tersebut ke dalam jendela Lightbox
                    lightboxImg.src = imgSrc;
                    lightboxJudul.innerText = judulFoto;
                    lightboxTanggal.innerText = tanggalFoto;
                    
                    // Atur link tombol download
                    lightboxDownload.href = imgSrc;
                    
                    // Munculkan jendela pop-up
                    lightbox.classList.remove('sembunyi');
                }
            });
        });

        // Tutup Lightbox saat tombol "X" diklik
        btnTutup.addEventListener('click', function() {
            lightbox.classList.add('sembunyi');
        });

        // Tutup Lightbox saat area gelap di luar gambar diklik
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                lightbox.classList.add('sembunyi');
            }
        });
    }

});
