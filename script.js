const form = document.getElementById("pasienForm");
const tableBody = document.querySelector("#pasienTable tbody");
let pasienList = [];
let editIndex = null;

form.addEventListener("submit", function(e) {
  e.preventDefault();

  // Ambil data form
  const nama = document.getElementById("nama").value;
  const umur = document.getElementById("umur").value;
  const alamat = document.getElementById("alamat").value;
  const nohp = document.getElementById("nohp").value;
  const usiaHamil = document.getElementById("usiaHamil").value;

  // Hitung HPL (perkiraan lahir)
  const hariIni = new Date();
  const mingguTersisa = 40 - usiaHamil;
  const perkiraan = new Date(hariIni);
  perkiraan.setDate(hariIni.getDate() + (mingguTersisa * 7));
  const hpl = perkiraan.toLocaleDateString("id-ID");

  if (editIndex === null) {
    // Tambah pasien baru
    pasienList.push({ nama, umur, alamat, nohp, usiaHamil, hpl });
  } else {
    // Update pasien yang diedit
    pasienList[editIndex] = { nama, umur, alamat, nohp, usiaHamil, hpl };
    editIndex = null;
  }

  // Render tabel
  renderTable();

  // Reset form
  form.reset();
});

function renderTable() {
  tableBody.innerHTML = "";
  pasienList.forEach((p, index) => {
    const row = `
      <tr>
        <td>${index + 1}</td>
        <td>${p.nama}</td>
        <td>${p.umur}</td>
        <td>${p.alamat}</td>
        <td>${p.nohp}</td>
        <td>${p.usiaHamil} minggu</td>
        <td>${p.hpl}</td>
        <td>
          <button class="action-btn edit-btn" onclick="editPasien(${index})">Edit</button>
          <button class="action-btn delete-btn" onclick="deletePasien(${index})">Hapus</button>
        </td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });
}

function editPasien(index) {
  const pasien = pasienList[index];
  document.getElementById("nama").value = pasien.nama;
  document.getElementById("umur").value = pasien.umur;
  document.getElementById("alamat").value = pasien.alamat;
  document.getElementById("nohp").value = pasien.nohp;
  document.getElementById("usiaHamil").value = pasien.usiaHamil;
  editIndex = index;
}

function deletePasien(index) {
  if (confirm("Yakin ingin hapus data pasien ini?")) {
    pasienList.splice(index, 1);
    renderTable();
  }
}
