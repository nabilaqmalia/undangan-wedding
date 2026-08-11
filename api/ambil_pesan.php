<?php

header("Content-Type: application/json; charset=UTF-8");

require_once "koneksi.php";

try {

    $sql = "
        SELECT
            id,
            nama,
            kehadiran,
            jumlah_tamu,
            pesan,
            dibuat
        FROM ucapan
        ORDER BY id DESC
    ";

    $stmt = $pdo->query($sql);

    $data = $stmt->fetchAll();

    echo json_encode(
        $data,
        JSON_UNESCAPED_UNICODE
    );

} catch (PDOException $e) {

    http_response_code(500);

    echo json_encode([
        "status" => "error",
        "message" => "Gagal mengambil ucapan."
    ]);

}