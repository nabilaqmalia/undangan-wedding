<?php

header("Content-Type: application/json; charset=UTF-8");

require_once "koneksi.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {

    http_response_code(405);

    echo json_encode([
        "status" => "error",
        "message" => "Metode tidak diperbolehkan."
    ]);

    exit;
}


/* ==============================
   AMBIL DATA
============================== */

$nama = trim($_POST["nama"] ?? "");
$pesan = trim($_POST["pesan"] ?? "");


/* ==============================
   VALIDASI
============================== */

if ($nama === "") {

    echo json_encode([
        "status" => "error",
        "message" => "Nama wajib diisi."
    ]);

    exit;
}

if ($pesan === "") {

    echo json_encode([
        "status" => "error",
        "message" => "Ucapan wajib diisi."
    ]);

    exit;
}


/* ==============================
   BATAS KARAKTER
============================== */

if (mb_strlen($nama) > 100) {

    echo json_encode([
        "status" => "error",
        "message" => "Nama terlalu panjang."
    ]);

    exit;
}

if (mb_strlen($pesan) > 1000) {

    echo json_encode([
        "status" => "error",
        "message" => "Ucapan terlalu panjang. Maksimal 1000 karakter."
    ]);

    exit;
}


/* ==============================
   SIMPAN DATABASE
============================== */

try {

    $sql = "
        INSERT INTO ucapan
        (
            nama,
            kehadiran,
            jumlah_tamu,
            pesan
        )
        VALUES
        (
            :nama,
            :kehadiran,
            :jumlah_tamu,
            :pesan
        )
    ";

    $stmt = $pdo->prepare($sql);

    $stmt->execute([
        ":nama" => $nama,
        ":kehadiran" => "Hadir",
        ":jumlah_tamu" => 1,
        ":pesan" => $pesan
    ]);


    echo json_encode([
        "status" => "success",
        "message" => "Ucapan berhasil dikirim."
    ]);

} catch (PDOException $e) {

    http_response_code(500);

    echo json_encode([
        "status" => "error",
        "message" => "Ucapan gagal disimpan."
    ]);

}