const dosenPTIKC = [
  "AlifyaNFH, S.Pd.,M.Pd",
  "M. Syahid Nur Wahid, M.Pd",
  "Dr. Iwan Suhardi, ST., MT.",
  "AsmaulHusna Nasrullah, S.Kom.,M.Kom.",
  "Dr. Muliadi, S.Pd.,M.T",
  "Haekal Febriansyah Ramadhan, S.T., M.Pd",
  "Prof. Dr. H. Syahrul, M.Pd",
  "Mardiana, S.Pd., M.Pd",
  "Dr. Ir. Mustari S. Lamada, S.Pd., M.T.",
  "Wahyu Hidayat M, S.Pd., M.Pd.",
  "Dr. Ir. Ridwan Daud Mahande, S.Pd., M.Pd., IPM.",
  "Shabrina Syntha Dewi, S.Pd., M.Pd.",
  "Veronika Asri Tandirerung, S.Pd, M.Pd",
  "Dyah Vitalocca, S.T., M.Pd.",
  "Muh. Akbar, S.Pd., M.Pd.",
];

const matakuliahPTIKC = [
  "Pemrograman Web",
  "Kecerdasan Buatan",
  "Jaringan Komputer",
  "Profesi Kependidikan",
  "Inovasi Teknologi",
  "Strategi Pembelajaran",
  "Keamanan Komputer",
  "Struktur Data",
];

const tempatKuliah = [
  "Lab 2 ICT",
  "Teknol 1D",
  "Lab jaringan",
  "Teknol 1E",
  "Lab programming",
  "Teknol 1F",
];

function populateSelectOptions() {
  const matakuliahSelect = document.getElementById("matakuliah");
  const dosenSelect = document.getElementById("dosen");
  const tempatSelect = document.getElementById("tempat");

  matakuliahPTIKC.forEach((matakuliah) => {
    const option = document.createElement("option");
    option.value = matakuliah;
    option.textContent = matakuliah;
    matakuliahSelect.appendChild(option);
  });

  dosenPTIKC.forEach((dosen) => {
    const option = document.createElement("option");
    option.value = dosen;
    option.textContent = dosen;
    dosenSelect.appendChild(option);
  });

  tempatKuliah.forEach((tempat) => {
    const option = document.createElement("option");
    option.value = tempat;
    option.textContent = tempat;
    tempatSelect.appendChild(option);
  });
}

function formatDateToDayMonthYear(dateString) {
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const date = new Date(dateString);
  const dayName = days[date.getDay()];
  const day = date.getDate();
  const monthName = months[date.getMonth()];
  const year = date.getFullYear();

  return `${dayName}, ${day} ${monthName} ${year}`;
}

function createSchedule(
  minggu,
  hari,
  matakuliah,
  waktu,
  sks,
  pelaksanaan,
  tempat,
  dosen
) {
  return `
          <h2>_Jadwal perkuliahan Minggu Ke ${minggu}. ${hari}_</h2>
          <p class="important">‼ *${matakuliah}* ‼ <br>
          - *Pukul ${waktu}* <br>
          Jumlah SKS : ${sks} <br>
          Pelaksanaan : ${pelaksanaan} <br>
          ${pelaksanaan === "Offline" ? `Tempat: ${tempat} <br>` : ""} 
          Dosen : ${dosen}</p>
          <p>> 📌NB : MK lain belum ada respon dari dosennya, nanti diupdate kalau sudah ada</p>
          <p>“msh bisa berubah tergantung siskon dan dosen👌”</p>
      `;
}

function handlePelaksanaanChange() {
  const pelaksanaanSelect = document.getElementById("pelaksanaan");
  const tempatGroup = document.getElementById("tempatGroup");

  if (pelaksanaanSelect.value === "Online") {
    tempatGroup.style.display = "none";
  } else {
    tempatGroup.style.display = "block";
  }
}

function copyToClipboard(text) {
  const tempInput = document.createElement("textarea");
  tempInput.value = text;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);
  alert("Jadwal telah disalin ke clipboard!");
}

document
  .getElementById("pelaksanaan")
  .addEventListener("change", handlePelaksanaanChange);

document
  .getElementById("scheduleForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const minggu = document.getElementById("minggu").value;
    const hariDate = document.getElementById("hari").value;
    const hariFormatted = formatDateToDayMonthYear(hariDate);
    const matakuliah = document.getElementById("matakuliah").value;
    const waktu = document.getElementById("waktu").value;
    const sks = document.getElementById("sks").value;
    const pelaksanaan = document.getElementById("pelaksanaan").value;
    const tempat =
      pelaksanaan === "Online"
        ? "N/A"
        : document.getElementById("tempat").value;
    const dosen = document.getElementById("dosen").value;

    const scheduleContent = createSchedule(
      minggu,
      hariFormatted,
      matakuliah,
      waktu,
      sks,
      pelaksanaan,
      tempat,
      dosen
    );
    document.getElementById("schedule").innerHTML = scheduleContent;
    document.getElementById("copyButton").style.display = "inline-block"; // Show the copy button
  });

document.getElementById("copyButton").addEventListener("click", function () {
  const scheduleContent = document.getElementById("schedule").innerText;
  copyToClipboard(scheduleContent);
});

// Populate the select options on page load
populateSelectOptions();
