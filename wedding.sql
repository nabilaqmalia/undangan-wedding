-- =========================================================
-- DATABASE UNDANGAN PERNIKAHAN
-- =========================================================

CREATE DATABASE IF NOT EXISTS wedding_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE wedding_db;

-- =========================================================
-- HAPUS TABEL JIKA SUDAH ADA
-- =========================================================

DROP TABLE IF EXISTS ucapan;

-- =========================================================
-- TABEL UCAPAN TAMU
-- =========================================================

CREATE TABLE ucapan (

    id INT AUTO_INCREMENT PRIMARY KEY,

    nama VARCHAR(100) NOT NULL,

    kehadiran ENUM(
        'Hadir',
        'Tidak Hadir',
        'Masih Ragu'
    ) NOT NULL DEFAULT 'Hadir',

    jumlah_tamu INT NOT NULL DEFAULT 1,

    pesan TEXT NOT NULL,

    dibuat DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    INDEX(nama),
    INDEX(kehadiran),
    INDEX(dibuat)

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

-- =========================================================
-- DATA CONTOH
-- =========================================================

INSERT INTO ucapan
(
nama,
kehadiran,
jumlah_tamu,
pesan
)

VALUES

(
'Andi',
'Hadir',
2,
'Selamat menempuh hidup baru. Semoga menjadi keluarga sakinah mawaddah warahmah.'
),

(
'Rina',
'Hadir',
1,
'Semoga Allah selalu memberkahi rumah tangga kalian.'
),

(
'Budi',
'Tidak Hadir',
1,
'Mohon maaf belum bisa hadir. Semoga acaranya lancar.'
);

-- =========================================================
-- VIEW STATISTIK
-- =========================================================

DROP VIEW IF EXISTS statistik;

CREATE VIEW statistik AS

SELECT

COUNT(*) AS total_ucapan,

SUM(
CASE
WHEN kehadiran='Hadir'
THEN 1
ELSE 0
END
) AS hadir,

SUM(
CASE
WHEN kehadiran='Tidak Hadir'
THEN 1
ELSE 0
END
) AS tidak_hadir,

SUM(
CASE
WHEN kehadiran='Masih Ragu'
THEN 1
ELSE 0
END
) AS masih_ragu,

SUM(
CASE
WHEN kehadiran='Hadir'
THEN jumlah_tamu
ELSE 0
END
) AS total_orang_hadir;
