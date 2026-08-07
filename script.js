"use strict";


// ==========================================
// ELEMENT UTAMA
// ==========================================

const cover =
    document.getElementById("cover");

const invitation =
    document.getElementById("invitation");

const openButton =
    document.getElementById("openButton");

const controls =
    document.getElementById("controls");

const weddingMusic =
    document.getElementById("weddingMusic");

const musicButton =
    document.getElementById("musicButton");

const scrollButton =
    document.getElementById("scrollButton");

const zoomOutButton =
    document.getElementById("zoomOutButton");

const loveVideo =
    document.getElementById("loveVideo");

const progressBar =
    document.getElementById("progressBar");


// ==========================================
// MUSIK
// ==========================================

let musicPlaying = false;


async function playMusic() {

    try {

        weddingMusic.volume = 0.65;

        weddingMusic.muted = false;


        await weddingMusic.play();


        musicPlaying = true;


        musicButton.textContent =
            "♫";


        musicButton.classList.add(
            "playing"
        );

    }

    catch (error) {

        musicPlaying = false;


        musicButton.textContent =
            "▶";


        console.error(
            "Musik tidak dapat diputar:",
            error
        );

    }

}


function pauseMusic() {

    weddingMusic.pause();


    musicPlaying = false;


    musicButton.textContent =
        "▶";


    musicButton.classList.remove(
        "playing"
    );

}


// ==========================================
// BUKA UNDANGAN
// ==========================================

openButton.addEventListener(
    "click",
    async function () {

        /*
        Musik dipanggil langsung dari
        klik pengguna supaya browser HP
        mengizinkan audio.
        */

        playMusic();


        // Siapkan isi website
        invitation.style.display =
            "block";


        // Tutup cover
        cover.classList.add(
            "hide"
        );


        setTimeout(
            function () {

                cover.style.display =
                    "none";


                controls.style.display =
                    "flex";


                window.scrollTo(
                    0,
                    0
                );


                activateReveal();


                /*
                AUTO SCROLL MULAI
                setelah 2.5 detik
                */

                setTimeout(
                    function () {

                        startAutoScroll();

                    },
                    2500
                );

            },
            900
        );

    }
);


// ==========================================
// MUSIC BUTTON
// ==========================================

musicButton.addEventListener(
    "click",
    function () {

        if (weddingMusic.paused) {

            playMusic();

        }

        else {

            pauseMusic();

        }

    }
);


// ==========================================
// AUTO SCROLL
// ==========================================

let autoScrollActive = false;

let scrollAnimation = null;

let previousTime = null;


/*
Semakin besar angka ini,
semakin cepat auto scroll.

18 = pelan
22 = sedang
28 = cepat
*/

const SCROLL_SPEED = 20;


function startAutoScroll() {

    if (autoScrollActive) {
        return;
    }


    autoScrollActive = true;


    previousTime = null;


    scrollButton.textContent =
        "❚❚";


    scrollAnimation =
        requestAnimationFrame(
            autoScroll
        );

}


function autoScroll(currentTime) {

    if (!autoScrollActive) {
        return;
    }


    if (previousTime === null) {

        previousTime =
            currentTime;

    }


    const delta =
        currentTime -
        previousTime;


    previousTime =
        currentTime;


    const distance =
        SCROLL_SPEED
        *
        (delta / 1000);


    window.scrollBy(
        0,
        distance
    );


    const currentBottom =
        window.scrollY
        +
        window.innerHeight;


    const documentHeight =
        document.documentElement
            .scrollHeight;


    /*
    Kalau sudah sampai bawah,
    auto scroll berhenti.
    */

    if (
        currentBottom >=
        documentHeight - 5
    ) {

        stopAutoScroll();

        return;

    }


    scrollAnimation =
        requestAnimationFrame(
            autoScroll
        );

}


function stopAutoScroll() {

    autoScrollActive = false;


    previousTime = null;


    scrollButton.textContent =
        "↓";


    if (
        scrollAnimation !== null
    ) {

        cancelAnimationFrame(
            scrollAnimation
        );


        scrollAnimation =
            null;

    }

}


// ==========================================
// PAUSE / RESUME AUTO SCROLL
// ==========================================

scrollButton.addEventListener(
    "click",
    function () {

        if (autoScrollActive) {

            stopAutoScroll();

        }

        else {

            startAutoScroll();

        }

    }
);


// ==========================================
// ZOOM OUT
// ==========================================

/*
Tombol minus mempunyai 3 ukuran:

100%
92%
86%

Ini hanya mengubah tampilan isi undangan,
bukan cover.
*/

const zoomLevels = [
    1,
    0.92,
    0.86
];


let zoomIndex = 0;


zoomOutButton.addEventListener(
    "click",
    function () {

        zoomIndex++;


        if (
            zoomIndex >=
            zoomLevels.length
        ) {

            zoomIndex = 0;

        }


        const zoom =
            zoomLevels[zoomIndex];


        /*
        CSS zoom bekerja baik pada
        browser Chromium seperti
        Chrome dan Edge.
        */

        invitation.style.zoom =
            zoom;


        if (zoom === 1) {

            zoomOutButton.textContent =
                "−";

            zoomOutButton.title =
                "Zoom Out";

        }

        else {

            zoomOutButton.textContent =
                Math.round(
                    zoom * 100
                )
                +
                "%";

            zoomOutButton.title =
                "Ukuran tampilan";

        }


        /*
        Reset waktu auto scroll supaya
        tidak meloncat setelah zoom.
        */

        previousTime = null;

    }
);


// ==========================================
// VIDEO LOVE STORY
// ==========================================

let musicBeforeVideo = false;

let scrollBeforeVideo = false;


if (loveVideo) {

    loveVideo.addEventListener(
        "play",
        function () {

            /*
            Ingat kondisi sebelum video.
            */

            musicBeforeVideo =
                !weddingMusic.paused;


            scrollBeforeVideo =
                autoScrollActive;


            /*
            Stop auto-scroll saat
            tamu menonton video.
            */

            stopAutoScroll();


            /*
            Musik dikecilkan supaya
            suara video terdengar.
            */

            if (musicBeforeVideo) {

                weddingMusic.volume =
                    0.08;

            }

        }
    );


    loveVideo.addEventListener(
        "pause",
        function () {

            if (musicBeforeVideo) {

                weddingMusic.volume =
                    0.65;

            }

        }
    );


    loveVideo.addEventListener(
        "ended",
        function () {

            if (musicBeforeVideo) {

                weddingMusic.volume =
                    0.65;

            }


            if (scrollBeforeVideo) {

                setTimeout(
                    function () {

                        startAutoScroll();

                    },
                    1000
                );

            }

        }
    );

}


// ==========================================
// PROGRESS BAR
// ==========================================

function updateProgressBar() {

    const scrollTop =
        window.scrollY;


    const totalHeight =
        document.documentElement
            .scrollHeight
        -
        window.innerHeight;


    if (totalHeight <= 0) {

        progressBar.style.width =
            "0%";

        return;

    }


    const percentage =
        (
            scrollTop
            /
            totalHeight
        )
        *
        100;


    progressBar.style.width =
        percentage
        +
        "%";

}


window.addEventListener(
    "scroll",
    updateProgressBar,
    {
        passive: true
    }
);


// ==========================================
// REVEAL ANIMATION
// ==========================================

function activateReveal() {

    const elements =
        document.querySelectorAll(
            ".reveal"
        );


    if (
        !(
            "IntersectionObserver"
            in window
        )
    ) {

        elements.forEach(
            function (element) {

                element.classList.add(
                    "animate"
                );

            }
        );


        return;

    }


    const observer =
        new IntersectionObserver(

            function (entries) {

                entries.forEach(
                    function (entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target
                                .classList
                                .add(
                                    "animate"
                                );


                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },

            {
                threshold: 0.08
            }

        );


    elements.forEach(
        function (element) {

            observer.observe(
                element
            );

        }
    );

}


// ==========================================
// COPY REKENING
// ==========================================

const copyButton =
    document.getElementById(
        "copyButton"
    );

const accountNumber =
    document.getElementById(
        "accountNumber"
    );

const copyStatus =
    document.getElementById(
        "copyStatus"
    );


copyButton.addEventListener(
    "click",
    async function () {

        const number =
            accountNumber
                .textContent
                .trim();


        try {

            await navigator
                .clipboard
                .writeText(
                    number
                );


            copyStatus.textContent =
                "✓ Nomor berhasil disalin";

        }

        catch (error) {

            copyStatus.textContent =
                "Salin manual: "
                +
                number;

        }

    }
);


// ==========================================
// UCAPAN TAMU MYSQL
// ==========================================

const wishForm = document.getElementById("wishForm");

const guestName = document.getElementById("guestName");
const guestMessage = document.getElementById("guestMessage");
const attendance = document.getElementById("attendance");
const guestCount = document.getElementById("guestCount");

const wishList = document.getElementById("wishList");

async function loadMessages(){

    try{

        const response = await fetch("api/ambil_pesan.php");

        const data = await response.json();

        wishList.innerHTML = "";

        data.forEach(function(item){

            wishList.innerHTML += `
                <div class="wish-item">

                    <strong>${item.nama}</strong>

                    <small>
                        ${item.kehadiran}
                        •
                        ${item.jumlah_tamu} Orang
                    </small>

                    <p>${item.pesan}</p>

                    <span>
                        ${item.dibuat}
                    </span>

                </div>
            `;

        });

    }

    catch(error){

        console.error(error);

    }

}

loadMessages();

wishForm.addEventListener("submit",async function(e){

    e.preventDefault();

    const formData = new FormData();

    formData.append("nama",guestName.value);

    formData.append("kehadiran",attendance.value);

    formData.append("jumlah_tamu",guestCount.value);

    formData.append("pesan",guestMessage.value);

    try{

        const response = await fetch(

            "api/kirim_pesan.php",

            {

                method:"POST",

                body:formData

            }

        );

        const hasil = await response.json();

        if(hasil.status=="success"){

            guestName.value="";

            guestMessage.value="";

            guestCount.value=1;

            attendance.value="Hadir";

            loadMessages();

        }

            setInterval(loadMessages,5000);
            

        else{

            alert(hasil.message);

        }

    }

    catch(error){

        console.error(error);

    }

});

// ==========================================
// WEDDING COUNTDOWN
// ==========================================

const daysElement =
    document.getElementById("days");

const hoursElement =
    document.getElementById("hours");

const minutesElement =
    document.getElementById("minutes");

const secondsElement =
    document.getElementById("seconds");

const daysElement2 = 
    document.getElementById("days2");

const hoursElement2 = 
    document.getElementById("hours2");

const minutesElement2 = 
    document.getElementById("minutes2");

const secondsElement2 = 
    document.getElementById("seconds2");


// ==========================================
// TANGGAL PERNIKAHAN
// ==========================================

const weddingDate =
    new Date(
        "2027-06-20T08:00:00+07:00"
    ).getTime();


// ==========================================
// FORMAT ANGKA
// ==========================================

function formatCountdown(number) {

    return String(number)
        .padStart(2, "0");

}


// ==========================================
// UPDATE COUNTDOWN
// ==========================================

function updateCountdown() {

    const now =
        new Date().getTime();


    const distance =
        weddingDate - now;


    /*
    Kalau tanggal pernikahan
    sudah lewat.
    */

    if (distance <= 0) {

        daysElement.textContent =
            "00";

        hoursElement.textContent =
            "00";

        minutesElement.textContent =
            "00";

        secondsElement.textContent =
            "00";

        return;

    }


    // HARI

    const days =
        Math.floor(
            distance /
            (
                1000 *
                60 *
                60 *
                24
            )
        );


    // JAM

    const hours =
        Math.floor(
            (
                distance %
                (
                    1000 *
                    60 *
                    60 *
                    24
                )
            )
            /
            (
                1000 *
                60 *
                60
            )
        );


    // MENIT

    const minutes =
        Math.floor(
            (
                distance %
                (
                    1000 *
                    60 *
                    60
                )
            )
            /
            (
                1000 *
                60
            )
        );


    // DETIK

    const seconds =
        Math.floor(
            (
                distance %
                (
                    1000 *
                    60
                )
            )
            /
            1000
        );


    // TAMPILKAN

    daysElement.textContent =
        formatCountdown(days);

    hoursElement.textContent =
        formatCountdown(hours);

    minutesElement.textContent =
        formatCountdown(minutes);

    secondsElement.textContent =
        formatCountdown(seconds);

    daysElement2.textContent =
        formatCountdown(days);

    hoursElement2.textContent =
        formatCountdown(hours);

    minutesElement2.textContent =
        formatCountdown(minutes);

    secondsElement2.textContent =
        formatCountdown(seconds);

    }

// Jalankan pertama kali

updateCountdown();


// Update setiap 1 detik

setInterval(
    updateCountdown,
    1000
);
