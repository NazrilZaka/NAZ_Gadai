document.addEventListener('DOMContentLoaded', () => {
    // =========================================================================
    // 1. DEKLARASI SELURUH ELEMEN DOM (DIPUSATKAN DI BAGIAN PALING ATAS)
    // =========================================================================

    // --- Elemen Login & Layout Utama ---
    const loginScreen = document.getElementById('login-screen');
    const mainScreen = document.getElementById('main-screen');
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginError = document.getElementById('login-error');
    const btnLogout = document.getElementById('btn-logout');
    const headerTitle = document.getElementById('header-title');
    const navItems = document.querySelectorAll('.nav-item');
    const tabViews = document.querySelectorAll('.tab-view');
    const btnAddFloating = document.getElementById('btn-add-floating');

    // --- Elemen Modal & Form Tambah Transaksi ---
    const modalTransaction = document.getElementById('modal-transaction');
    const btnCloseModal = document.getElementById('btn-close-modal');
    const tabJenisBtns = document.querySelectorAll('.tab-jenis-btn');
    const categoryItems = document.querySelectorAll('.category-item');
    const transactionForm = document.getElementById('transaction-form');
    const selectedCategoryText = document.getElementById('selected-category-text');
    const inputNamaNasabah = document.getElementById('nama_nasabah');
    const inputNoWa = document.getElementById('no_wa');
    const inputNilaiPinjaman = document.getElementById('nilai_pinjaman');
    const inputJatuhTempo = document.getElementById('jatuh_tempo');

    // --- Elemen Halaman Riwayat ---
    const emptyRiwayat = document.getElementById('empty-riwayat');
    const riwayatListContainer = document.getElementById('riwayat-list-container');

    // --- Elemen Modal Detail & Aksi Transaksi ---
    const modalDetail = document.getElementById('modal-detail');
    const btnCloseDetail = document.getElementById('btn-close-detail');
    const detailViewMode = document.getElementById('detail-view-mode');
    const detailId = document.getElementById('detail-id');
    const detailStatusBadge = document.getElementById('detail-status-badge');
    const detailNasabah = document.getElementById('detail-nasabah');
    const detailWa = document.getElementById('detail-wa');
    const detailKategori = document.getElementById('detail-kategori');
    const detailJenis = document.getElementById('detail-jenis');
    const detailNominal = document.getElementById('detail-nominal');
    const rowDetailMargin = document.getElementById('row-detail-margin');
    const detailMargin = document.getElementById('detail-margin');
    const detailTglMasuk = document.getElementById('detail-tgl-masuk');
    const detailTglKeluar = document.getElementById('detail-tgl-keluar');

    const btnWaReminder = document.getElementById('btn-wa-reminder');
    const btnTebusBarang = document.getElementById('btn-tebus-barang');
    const btnCetakNota = document.getElementById('btn-cetak-nota');
    const btnEditTrx = document.getElementById('btn-edit-trx');
    const btnHapusTrx = document.getElementById('btn-hapus-trx');

    // --- Elemen Form Edit Transaksi ---
    const editTransactionForm = document.getElementById('edit-transaction-form');
    const btnCancelEdit = document.getElementById('btn-cancel-edit');
    const editNamaNasabah = document.getElementById('edit_nama_nasabah');
    const editNoWa = document.getElementById('edit_no_wa');
    const editKategori = document.getElementById('edit_kategori');
    const editNilaiPinjaman = document.getElementById('edit_nilai_pinjaman');
    const editJatuhTempo = document.getElementById('edit_jatuh_tempo');

    // --- Elemen Area Cetak Nota ---
    const notaId = document.getElementById('nota-id');
    const notaTanggalCetak = document.getElementById('nota-tanggal-cetak');
    const notaNasabah = document.getElementById('nota-nasabah');
    const notaWa = document.getElementById('nota-wa');
    const notaKategori = document.getElementById('nota-kategori');
    const notaStatus = document.getElementById('nota-status');
    const notaTglMasuk = document.getElementById('nota-tgl-masuk');
    const notaTglKeluar = document.getElementById('nota-tgl-keluar');
    const notaNominal = document.getElementById('nota-nominal');

    // --- Elemen Halaman Grafik ---
    const grafikFilter = document.getElementById('grafik-filter');
    const chartCanvasWrapper = document.getElementById('chart-canvas-wrapper');
    const emptyGrafik = document.getElementById('empty-grafik');
    const cashflowCanvas = document.getElementById('cashflow-chart');
    const totalUangKeluarEl = document.getElementById('total-uang-keluar');
    const totalUangMasukEl = document.getElementById('total-uang-masuk');
    const totalBungaMarginEl = document.getElementById('total-bunga-margin');
    const selisihCashflowEl = document.getElementById('selisih-cashflow');

    // --- Elemen Halaman Laporan & Modal Detail Laporan ---
    const cardStatistikBulanan = document.getElementById('card-statistik-bulanan');
    const labelBulanIni = document.getElementById('label-bulan-ini');
    const statBulanKeluar = document.getElementById('stat-bulan-keluar');
    const statBulanMasuk = document.getElementById('stat-bulan-masuk');
    const statBulanBunga = document.getElementById('stat-bulan-bunga');
    const statBulanSaldo = document.getElementById('stat-bulan-saldo');

    const modalDetailLaporan = document.getElementById('detail-laporan');
    const btnBackLaporan = document.getElementById('btn-back-laporan');
    const alltimeSaldo = document.getElementById('alltime-saldo');
    const alltimeKeluar = document.getElementById('alltime-keluar');
    const alltimeMasuk = document.getElementById('alltime-masuk');
    const alltimeBunga = document.getElementById('alltime-bunga');
    const monthlyListContainer = document.getElementById('monthly-list-container');

    // =========================================================================
    // 2. KONSTANTA & STATE APLIKASI
    // =========================================================================

    // const STORAGE_KEYS = {
    //     TRANSACTIONS: 'gadai_transactions',
    //     AUTH: 'gadai_is_logged_in'
    // };

    // URL Endpoint Backend Node.js + Express
    const API_URL = 'https://naz-gadai-api.vercel.app/api/gadai';

    // STORAGE_KEYS kini hanya menyimpan sesi login di browser
    const STORAGE_KEYS = {
        AUTH: 'gadai_is_logged_in'
    };

    const CATEGORY_ICONS = {
        HP: 'fa-mobile-screen-button',
        Motor: 'fa-motorcycle',
        TV: 'fa-tv',
        Laptop: 'fa-laptop',
        Emas: 'fa-gem',
        Mobil: 'fa-car',
        Kamera: 'fa-camera',
        Lainnya: 'fa-box-archive'
    };

    const NAMA_BULAN_FULL = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];

    const NAMA_BULAN_SHORT = [
        'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
        'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'
    ];

    let currentJenisTransaksi = 'Gadai_Keluar_Uang';
    let currentKategori = '';
    let selectedTrxId = null;
    let cashflowChartInstance = null;
    let isSubmittingTrx = false;
    let isSubmittingEdit = false;

    // =========================================================================
    // 3. FUNGSI HELPER (FORMATTER & UTILITAS)
    // =========================================================================

    function formatRupiah(nominal) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(nominal || 0);
    }

    function formatSaldoRupiah(nominal, pakaiSimbolRp = true) {
        const val = Number(nominal) || 0;
        const isNegative = val < 0;
        const absVal = Math.abs(val);
        const formattedNumber = new Intl.NumberFormat('id-ID', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(absVal);

        const prefixRp = pakaiSimbolRp ? 'Rp ' : '';
        return isNegative ? `-${prefixRp}${formattedNumber}` : `${prefixRp}${formattedNumber}`;
    }

    function formatShortDate(isoString) {
        if (!isoString) return '-';
        const date = new Date(isoString);
        if (isNaN(date.getTime())) return '-';
        return date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    }

    function getGroupDateLabel(isoString) {
        const trxDate = new Date(isoString);
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);

        const isSameDay = (d1, d2) =>
            d1.getFullYear() === d2.getFullYear() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getDate() === d2.getDate();

        if (isSameDay(trxDate, today)) return 'Hari Ini';
        if (isSameDay(trxDate, yesterday)) return 'Kemarin';

        return trxDate.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    }

    function getStatusBadgeClass(status) {
        switch (status) {
            case 'Jatuh Tempo':
                return 'badge-jatuh-tempo';
            case 'Ditebus':
                return 'badge-ditebus';
            case 'Diperpanjang':
                return 'badge-diperpanjang';
            default:
                return 'badge-aktif';
        }
    }

    function isDateInFilterPeriod(isoString, filterType) {
        if (!isoString) return false;
        const trxDate = new Date(isoString);
        if (isNaN(trxDate.getTime())) return false;

        const now = new Date();
        const sameYear = trxDate.getFullYear() === now.getFullYear();

        if (filterType === 'bulan_ini') {
            return sameYear && trxDate.getMonth() === now.getMonth();
        }
        if (filterType === 'kuartal_ini') {
            const currentQuarter = Math.floor(now.getMonth() / 3);
            const trxQuarter = Math.floor(trxDate.getMonth() / 3);
            return sameYear && trxQuarter === currentQuarter;
        }
        if (filterType === 'tahun_ini') {
            return sameYear;
        }
        return true;
    }

    // =========================================================================
    // 4. FUNGSI LOGIKA & RENDER UI
    // =========================================================================

    function showMainApp() {
        loginScreen.classList.add('hidden');
        mainScreen.classList.remove('hidden');
    }

    function showLoginScreen() {
        mainScreen.classList.add('hidden');
        loginScreen.classList.remove('hidden');
        loginForm.reset();
        loginError.classList.add('hidden');
    }

    function resetModalTransaction() {
        transactionForm.reset();
        transactionForm.classList.add('hidden');
        currentKategori = '';
        selectedCategoryText.textContent = '-';

        categoryItems.forEach((item) => item.classList.remove('selected'));

        currentJenisTransaksi = 'Gadai_Keluar_Uang';
        tabJenisBtns.forEach((btn) => {
            if (btn.getAttribute('data-jenis') === 'Gadai_Keluar_Uang') {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    async function checkAndUpdateDueStatus() {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const transactions = await response.json();

            const now = new Date();
            const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

            // Cek apakah ada transaksi Aktif/Diperpanjang yang sudah lewat jatuh tempo
            for (const trx of transactions) {
                if (trx.tanggal_keluar && (trx.status === 'Aktif' || trx.status === 'Diperpanjang')) {
                    const due = new Date(trx.tanggal_keluar);
                    const dueMidnight = new Date(due.getFullYear(), due.getMonth(), due.getDate()).getTime();

                    if (todayMidnight > dueMidnight) {
                        trx.status = 'Jatuh Tempo';

                        // Sinkronkan perubahan status "Jatuh Tempo" ke database MySQL
                        await fetch(`${API_URL}/${trx.id}`, {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(trx)
                        });
                    }
                }
            }

            return transactions;
        } catch (error) {
            console.error('Gagal mengambil data dari server backend:', error);
            return [];
        }
    }

    async function renderRiwayat() {
        const transactions = await checkAndUpdateDueStatus();
        if (transactions.length === 0) {
            emptyRiwayat.classList.remove('hidden');
            riwayatListContainer.classList.add('hidden');
            riwayatListContainer.innerHTML = '';
            return;
        }

        emptyRiwayat.classList.add('hidden');
        riwayatListContainer.classList.remove('hidden');

        const groupedData = {};
        transactions.forEach((trx) => {
            const label = getGroupDateLabel(trx.tanggal_masuk);
            if (!groupedData[label]) {
                groupedData[label] = [];
            }
            groupedData[label].push(trx);
        });

        let htmlContent = '';
        for (const [dateLabel, items] of Object.entries(groupedData)) {
            htmlContent += `
                <div class="date-group">
                    <div class="date-group-header">${dateLabel}</div>
                    <div class="riwayat-list">
            `;

            items.forEach((trx) => {
                const isGadai = trx.jenis_transaksi === 'Gadai_Keluar_Uang';
                const amountClass = isGadai ? 'uang-keluar' : 'uang-masuk';
                const amountPrefix = isGadai ? '- ' : '+ ';
                const iconClass = CATEGORY_ICONS[trx.kategori] || 'fa-box-archive';
                const badgeClass = getStatusBadgeClass(trx.status);

                htmlContent += `
                    <div class="riwayat-card" data-id="${trx.id}">
                        <div class="riwayat-left">
                            <div class="riwayat-icon">
                                <i class="fa-solid ${iconClass}"></i>
                            </div>
                            <div class="riwayat-info">
                                <div class="riwayat-nasabah">${trx.nama_nasabah}</div>
                                <div class="riwayat-meta">
                                    <span>${trx.kategori}</span>
                                    <span>&bull;</span>
                                    <span>Tempo: ${formatShortDate(trx.tanggal_keluar)}</span>
                                </div>
                            </div>
                        </div>
                        <div class="riwayat-right">
                            <div class="riwayat-amount ${amountClass}">
                                ${amountPrefix}${formatRupiah(trx.nilai_pinjaman)}
                            </div>
                            <span class="badge-status ${badgeClass}">${trx.status}</span>
                        </div>
                    </div>
                `;
            });

            htmlContent += `
                    </div>
                </div>
            `;
        }

        riwayatListContainer.innerHTML = htmlContent;
    }

    // ================= LOGIKA BUKA MODAL DETAIL TRANSAKSI =================
    async function openDetailModal(trxId) {
        // Ambil data terbaru dari backend MySQL
        const transactions = await checkAndUpdateDueStatus();
        
        // Cari transaksi berdasarkan ID (Gunakan String() agar aman dari perbedaan tipe data)
        const trx = transactions.find((item) => String(item.id) === String(trxId));
        if (!trx) return;

        selectedTrxId = trx.id;

        // Isi informasi ke dalam Modal Detail
        if (detailId) detailId.textContent = trx.id;
        if (detailStatusBadge) {
            detailStatusBadge.textContent = trx.status;
            detailStatusBadge.className = `badge-status ${getStatusBadgeClass(trx.status)}`;
        }

        if (detailNasabah) detailNasabah.textContent = trx.nama_nasabah;
        if (detailWa) detailWa.textContent = trx.no_wa;
        if (detailKategori) detailKategori.textContent = trx.kategori;
        if (detailJenis) detailJenis.textContent = trx.jenis_transaksi === 'Gadai_Keluar_Uang' ? 'Gadai (Uang Keluar)' : 'Tebus (Uang Masuk)';
        if (detailNominal) detailNominal.textContent = formatRupiah(trx.nilai_pinjaman);
        if (detailTglMasuk) detailTglMasuk.textContent = formatShortDate(trx.tanggal_masuk);
        if (detailTglKeluar) detailTglKeluar.textContent = formatShortDate(trx.tanggal_keluar);

        // Atur tampilan tombol Tebus & baris Keuntungan (Bunga)
        if (trx.status === 'Ditebus') {
            if (btnTebusBarang) btnTebusBarang.classList.add('hidden');
            if (rowDetailMargin) rowDetailMargin.classList.remove('hidden');
            if (detailMargin) detailMargin.textContent = formatRupiah(trx.bunga_margin || 0);
        } else {
            if (btnTebusBarang) btnTebusBarang.classList.remove('hidden');
            if (rowDetailMargin) rowDetailMargin.classList.add('hidden');
        }

        // Pastikan modal dalam Mode Tampil (Bukan Mode Edit)
        if (detailViewMode) detailViewMode.classList.remove('hidden');
        if (editTransactionForm) editTransactionForm.classList.add('hidden');
        
        // Munculkan Modal
        if (modalDetail) modalDetail.classList.remove('hidden');
    }

    async function renderGrafik() {
        if (!grafikFilter) return;

        // Cegah render jika tab grafik sedang disembunyikan (mencegah bug Canvas 0x0 Chart.js)
        const viewGrafik = document.getElementById('view-grafik');
        if (viewGrafik && viewGrafik.classList.contains('hidden')) return;

        // Ambil data dari backend via fungsi checkAndUpdateDueStatus
        const transactions = await checkAndUpdateDueStatus();
        const selectedFilter = grafikFilter.value;

        let totalKeluar = 0;
        let totalMasuk = 0;
        let totalBunga = 0;

        transactions.forEach((trx) => {
            const referenceDate = (trx.jenis_transaksi === 'Tebus_Masuk_Uang' && trx.status === 'Ditebus' && trx.tanggal_keluar)
                ? trx.tanggal_keluar
                : trx.tanggal_masuk;

            if (isDateInFilterPeriod(referenceDate, selectedFilter)) {
                const nominal = Number(trx.nilai_pinjaman) || 0;
                const bunga = Number(trx.bunga_margin) || 0;

                if (trx.jenis_transaksi === 'Gadai_Keluar_Uang') {
                    totalKeluar += nominal;
                } else if (trx.jenis_transaksi === 'Tebus_Masuk_Uang') {
                    totalMasuk += nominal;
                    if (trx.status === 'Ditebus') {
                        totalBunga += bunga;
                    }
                }
            }
        });

        const selisih = (totalMasuk + totalBunga) - totalKeluar;

        if (totalUangKeluarEl) totalUangKeluarEl.textContent = formatRupiah(totalKeluar);
        if (totalUangMasukEl) totalUangMasukEl.textContent = formatRupiah(totalMasuk);
        if (totalBungaMarginEl) totalBungaMarginEl.textContent = formatRupiah(totalBunga);
        if (selisihCashflowEl) {
            selisihCashflowEl.textContent = (selisih < 0 ? '- ' : '+ ') + formatRupiah(Math.abs(selisih));
            selisihCashflowEl.className = selisih >= 0 ? 'text-masuk' : 'text-keluar';
        }

        if (totalKeluar === 0 && totalMasuk === 0 && totalBunga === 0) {
            chartCanvasWrapper.classList.add('hidden');
            emptyGrafik.classList.remove('hidden');
            if (cashflowChartInstance) {
                cashflowChartInstance.destroy();
                cashflowChartInstance = null;
            }
            return;
        }

        emptyGrafik.classList.add('hidden');
        chartCanvasWrapper.classList.remove('hidden');

        if (cashflowChartInstance) {
            cashflowChartInstance.destroy();
        }

        const ctx = cashflowCanvas.getContext('2d');
        cashflowChartInstance = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Uang Keluar (Modal)', 'Uang Masuk (Pokok)', 'Keuntungan (Bunga)'],
                datasets: [{
                    data: [totalKeluar, totalMasuk, totalBunga],
                    backgroundColor: ['#ef4444', '#10b981', '#f59e0b'],
                    borderColor: '#1e293b',
                    borderWidth: 3,
                    hoverOffset: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                cutout: '62%',
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#f8fafc',
                            padding: 14,
                            font: {
                                size: 11,
                                weight: '600'
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                const val = context.parsed || 0;
                                return ` ${context.label}: ${formatRupiah(val)}`;
                            }
                        }
                    }
                }
            }
        });
    }

    async function renderLaporan() {
        const transactions = await checkAndUpdateDueStatus();
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        if (labelBulanIni) {
            labelBulanIni.textContent = `${NAMA_BULAN_FULL[currentMonth]} ${currentYear}`;
        }

        let bulanIniKeluar = 0;
        let bulanIniMasuk = 0;
        let bulanIniBunga = 0;

        let totalAllKeluar = 0;
        let totalAllMasuk = 0;
        let totalAllBunga = 0;

        const monthlyGroups = {};

        transactions.forEach((trx) => {
            const nominal = Number(trx.nilai_pinjaman) || 0;
            const bunga = (trx.status === 'Ditebus') ? (Number(trx.bunga_margin) || 0) : 0;

            const rawDate = (trx.jenis_transaksi === 'Tebus_Masuk_Uang' && trx.status === 'Ditebus' && trx.tanggal_keluar)
                ? trx.tanggal_keluar
                : trx.tanggal_masuk;

            const trxDate = new Date(rawDate);
            if (isNaN(trxDate.getTime())) return;

            const m = trxDate.getMonth();
            const y = trxDate.getFullYear();
            const groupKey = `${y}-${String(m + 1).padStart(2, '0')}`;

            if (!monthlyGroups[groupKey]) {
                monthlyGroups[groupKey] = {
                    monthIndex: m,
                    year: y,
                    pengeluaran: 0,
                    pemasukan: 0,
                    bunga: 0
                };
            }

            if (trx.jenis_transaksi === 'Gadai_Keluar_Uang') {
                totalAllKeluar += nominal;
                monthlyGroups[groupKey].pengeluaran += nominal;
                if (m === currentMonth && y === currentYear) {
                    bulanIniKeluar += nominal;
                }
            } else if (trx.jenis_transaksi === 'Tebus_Masuk_Uang') {
                totalAllMasuk += nominal;
                totalAllBunga += bunga;
                monthlyGroups[groupKey].pemasukan += nominal;
                monthlyGroups[groupKey].bunga += bunga;

                if (m === currentMonth && y === currentYear) {
                    bulanIniMasuk += nominal;
                    bulanIniBunga += bunga;
                }
            }
        });

        const bulanIniSaldo = (bulanIniMasuk + bulanIniBunga) - bulanIniKeluar;
        if (statBulanKeluar) statBulanKeluar.textContent = formatSaldoRupiah(bulanIniKeluar, false);
        if (statBulanMasuk) statBulanMasuk.textContent = formatSaldoRupiah(bulanIniMasuk, false);
        if (statBulanBunga) statBulanBunga.textContent = formatSaldoRupiah(bulanIniBunga, false);
        if (statBulanSaldo) {
            statBulanSaldo.textContent = formatSaldoRupiah(bulanIniSaldo, false);
            statBulanSaldo.className = `stat-value ${bulanIniSaldo < 0 ? 'text-keluar' : 'text-masuk'}`;
        }

        const totalAllSaldo = (totalAllMasuk + totalAllBunga) - totalAllKeluar;
        if (alltimeSaldo) {
            alltimeSaldo.textContent = formatSaldoRupiah(totalAllSaldo, true);
            alltimeSaldo.className = `hero-main-amount ${totalAllSaldo < 0 ? 'text-keluar' : 'text-masuk'}`;
        }
        if (alltimeKeluar) alltimeKeluar.textContent = formatSaldoRupiah(totalAllKeluar, true);
        if (alltimeMasuk) alltimeMasuk.textContent = formatSaldoRupiah(totalAllMasuk, true);
        if (alltimeBunga) alltimeBunga.textContent = formatSaldoRupiah(totalAllBunga, true);

        if (!monthlyListContainer) return;

        const sortedKeys = Object.keys(monthlyGroups).sort((a, b) => b.localeCompare(a));

        if (sortedKeys.length === 0) {
            monthlyListContainer.innerHTML = `
                <div class="empty-monthly-row">
                    Belum ada data transaksi untuk ditampilkan.
                </div>
            `;
            return;
        }

        let rowsHtml = '';
        sortedKeys.forEach((key) => {
            const item = monthlyGroups[key];
            const saldoBulan = (item.pemasukan + item.bunga) - item.pengeluaran;
            const saldoClass = saldoBulan < 0 ? 'text-keluar' : 'text-masuk';

            rowsHtml += `
                <div class="monthly-row">
                    <div class="month-name-cell">
                        <span class="month-short">${NAMA_BULAN_SHORT[item.monthIndex]}</span>
                        <span class="month-year">${item.year}</span>
                    </div>
                    <div class="month-val-cell text-keluar">
                        ${formatSaldoRupiah(item.pengeluaran, false)}
                    </div>
                    <div class="month-val-cell text-masuk">
                        ${formatSaldoRupiah(item.pemasukan, false)}
                    </div>
                    <div class="month-val-cell text-bunga">
                        ${formatSaldoRupiah(item.bunga, false)}
                    </div>
                    <div class="month-val-cell ${saldoClass}">
                        ${formatSaldoRupiah(saldoBulan, false)}
                    </div>
                </div>
            `;
        });

        monthlyListContainer.innerHTML = rowsHtml;
    }

    // =========================================================================
    // 5. EVENT LISTENERS (TERPUSAT & HANYA DIPASANG SATU KALI)
    // =========================================================================

    // --- Autentikasi Login & Logout ---
    if (localStorage.getItem(STORAGE_KEYS.AUTH) === 'true') {
        showMainApp();
    }

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (username === 'naz' && password === 'naz123') {
            localStorage.setItem(STORAGE_KEYS.AUTH, 'true');
            loginError.classList.add('hidden');
            showMainApp();
        } else {
            loginError.classList.remove('hidden');
        }
    });

    btnLogout.addEventListener('click', () => {
        localStorage.removeItem(STORAGE_KEYS.AUTH);
        showLoginScreen();
    });

    // --- Navigasi Bottom Bar (Digabung menjadi 1 listener) ---
    navItems.forEach((item) => {
        item.addEventListener('click', () => {
            const targetId = item.getAttribute('data-target');
            const newTitle = item.getAttribute('data-title');

            navItems.forEach((nav) => nav.classList.remove('active'));
            item.classList.add('active');

            tabViews.forEach((view) => {
                if (view.id === targetId) {
                    view.classList.remove('hidden');
                } else {
                    view.classList.add('hidden');
                }
            });

            headerTitle.textContent = newTitle;

            if (targetId === 'view-riwayat') renderRiwayat();
            if (targetId === 'view-grafik') renderGrafik();
            if (targetId === 'view-laporan') renderLaporan();
        });
    });

    // --- Modal Tambah Transaksi ---
    btnAddFloating.addEventListener('click', () => {
        resetModalTransaction();
        modalTransaction.classList.remove('hidden');
    });

    btnCloseModal.addEventListener('click', () => {
        modalTransaction.classList.add('hidden');
    });

    tabJenisBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            tabJenisBtns.forEach((b) => b.classList.remove('active'));
            btn.classList.add('active');
            currentJenisTransaksi = btn.getAttribute('data-jenis');
        });
    });

    categoryItems.forEach((item) => {
        item.addEventListener('click', () => {
            categoryItems.forEach((cat) => cat.classList.remove('selected'));
            item.classList.add('selected');

            currentKategori = item.getAttribute('data-category');
            selectedCategoryText.textContent = currentKategori;

            transactionForm.classList.remove('hidden');
            transactionForm.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    });

    inputNoWa.addEventListener('input', () => {
        inputNoWa.value = inputNoWa.value.replace(/[^0-9]/g, '');
    });

    // --- Submit Transaksi Baru (POST ke Backend) ---
    transactionForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();

        if (isSubmittingTrx) return;

        if (!currentKategori) {
            alert('Silakan pilih kategori barang terlebih dahulu!');
            return;
        }

        const submitBtn = transactionForm.querySelector('button[type="submit"]');
        isSubmittingTrx = true;
        if (submitBtn) submitBtn.disabled = true;

        try {
            const waktuSekarang = new Date().toISOString();
            const isGadaiBaru = currentJenisTransaksi === 'Gadai_Keluar_Uang';

            const newTransaction = {
                id: 'TRX-' + Date.now(), // ID dibuat oleh frontend sesuai spesifikasi body JSON kamu
                nama_nasabah: inputNamaNasabah.value.trim(),
                no_wa: inputNoWa.value.trim(),
                kategori: currentKategori,
                jenis_transaksi: currentJenisTransaksi,
                nilai_pinjaman: Number(inputNilaiPinjaman.value),
                bunga_margin: 0,
                tanggal_masuk: waktuSekarang,
                tanggal_keluar: inputJatuhTempo.value ? new Date(inputJatuhTempo.value).toISOString() : null,
                status: isGadaiBaru ? 'Aktif' : 'Ditebus'
            };

            // Kirim data ke backend MySQL
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newTransaction)
            });

            if (!response.ok) {
                throw new Error('Gagal menyimpan ke database');
            }

            modalTransaction.classList.add('hidden');
            resetModalTransaction();

            // Refresh UI dengan mengambil data terbaru dari database
            await renderRiwayat();
            await renderGrafik();
            await renderLaporan();

            alert('Data transaksi berhasil disimpan ke Database!');
        } catch (error) {
            console.error('Error POST transaksi:', error);
            alert('Terjadi kesalahan saat menyimpan data ke server.');
        } finally {
            isSubmittingTrx = false;
            if (submitBtn) submitBtn.disabled = false;
        }
    });
    // --- Klik Card Riwayat & Tutup Modal Detail ---
    riwayatListContainer.addEventListener('click', (e) => {
        const card = e.target.closest('.riwayat-card');
        if (!card) return;

        const trxId = card.getAttribute('data-id');
        openDetailModal(trxId);
    });

    btnCloseDetail.addEventListener('click', () => {
        modalDetail.classList.add('hidden');
        selectedTrxId = null;
    });

    modalDetail.addEventListener('click', (e) => {
        if (e.target === modalDetail) {
            modalDetail.classList.add('hidden');
            selectedTrxId = null;
        }
    });

    // --- Aksi 1: Ingatkan via WA ---
    btnWaReminder.addEventListener('click', async () => {
        if (!selectedTrxId) return;

        const transactions = await checkAndUpdateDueStatus();
        const trx = transactions.find((item) => String(item.id) === String(selectedTrxId));
        if (!trx) return;

        let formattedPhone = trx.no_wa.replace(/[^0-9]/g, '');
        if (formattedPhone.startsWith('0')) {
            formattedPhone = '62' + formattedPhone.slice(1);
        }

        const tglJatuhTempo = formatShortDate(trx.tanggal_keluar);
        const pesan = `Halo Bapak/Ibu ${trx.nama_nasabah}, barang gadai berupa ${trx.kategori} sudah memasuki jatuh tempo tanggal ${tglJatuhTempo}. Mohon untuk segera melunasi atau barang akan kami lelang, terimakasih.`;
        const waUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(pesan)}`;

        window.open(waUrl, '_blank');
    });

    // --- Aksi 2: Tebus Barang (PUT ke Backend) ---
    btnTebusBarang.addEventListener('click', async () => {
        if (!selectedTrxId) return;

        const inputBunga = prompt('Masukkan Nominal Bunga/Keuntungan (Rp):', '0');
        if (inputBunga === null) return;

        const nominalBunga = Number(inputBunga.replace(/[^0-9]/g, '')) || 0;

        try {
            const transactions = await checkAndUpdateDueStatus();
            const trx = transactions.find((item) => String(item.id) === String(selectedTrxId));
            if (!trx) return;

            trx.bunga_margin = nominalBunga;
            trx.status = 'Ditebus';
            trx.tanggal_keluar = new Date().toISOString();
            trx.jenis_transaksi = 'Tebus_Masuk_Uang';

            // Kirim PUT request ke Backend untuk update data
            const response = await fetch(`${API_URL}/${selectedTrxId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(trx)
            });

            if (!response.ok) throw new Error('Gagal update status tebus barang');

            await renderRiwayat();
            await renderGrafik();
            await renderLaporan();
            
            openDetailModal(selectedTrxId);
            alert(`Barang berhasil ditebus dengan keuntungan ${formatRupiah(nominalBunga)}!`);
        } catch (error) {
            console.error('Error PUT Tebus:', error);
            alert('Terjadi kesalahan saat memproses tebusan.');
        }
    });

    // --- Aksi 4: Edit / Revisi Data Transaksi (PUT ke Backend) ---
    if (editNoWa) {
        editNoWa.addEventListener('input', () => {
            editNoWa.value = editNoWa.value.replace(/[^0-9]/g, '');
        });
    }

    if (btnEditTrx) {
        btnEditTrx.addEventListener('click', async () => {
            if (!selectedTrxId) return;

            const transactions = await checkAndUpdateDueStatus();
            const trx = transactions.find((item) => String(item.id) === String(selectedTrxId));
            if (!trx) return;

            editNamaNasabah.value = trx.nama_nasabah;
            editNoWa.value = trx.no_wa;
            editKategori.value = trx.kategori;
            editNilaiPinjaman.value = trx.nilai_pinjaman;

            if (trx.tanggal_keluar) {
                const d = new Date(trx.tanggal_keluar);
                if (!isNaN(d.getTime())) {
                    const yyyy = d.getFullYear();
                    const mm = String(d.getMonth() + 1).padStart(2, '0');
                    const dd = String(d.getDate()).padStart(2, '0');
                    editJatuhTempo.value = `${yyyy}-${mm}-${dd}`;
                } else {
                    editJatuhTempo.value = '';
                }
            } else {
                editJatuhTempo.value = '';
            }

            detailViewMode.classList.add('hidden');
            editTransactionForm.classList.remove('hidden');
        });
    }

    if (btnCancelEdit) {
        btnCancelEdit.addEventListener('click', () => {
            editTransactionForm.classList.add('hidden');
            detailViewMode.classList.remove('hidden');
        });
    }

    if (editTransactionForm) {
        editTransactionForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            e.stopImmediatePropagation();

            if (isSubmittingEdit || !selectedTrxId) return;

            const submitEditBtn = editTransactionForm.querySelector('button[type="submit"]');
            isSubmittingEdit = true;
            if (submitEditBtn) submitEditBtn.disabled = true;

            try {
                const transactions = await checkAndUpdateDueStatus();
                const trx = transactions.find((item) => String(item.id) === String(selectedTrxId));
                if (!trx) return;

                trx.nama_nasabah = editNamaNasabah.value.trim();
                trx.no_wa = editNoWa.value.trim();
                trx.kategori = editKategori.value;
                trx.nilai_pinjaman = Number(editNilaiPinjaman.value);
                trx.tanggal_keluar = editJatuhTempo.value
                    ? new Date(editJatuhTempo.value).toISOString()
                    : trx.tanggal_keluar;

                if (trx.status !== 'Ditebus' && trx.tanggal_keluar) {
                    const now = new Date();
                    const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
                    const due = new Date(trx.tanggal_keluar);
                    const dueMidnight = new Date(due.getFullYear(), due.getMonth(), due.getDate()).getTime();

                    trx.status = todayMidnight > dueMidnight ? 'Jatuh Tempo' : 'Aktif';
                }

                // Kirim PUT request ke Backend untuk update hasil edit
                const response = await fetch(`${API_URL}/${selectedTrxId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(trx)
                });

                if (!response.ok) throw new Error('Gagal mengupdate data hasil edit');

                modalDetail.classList.add('hidden');
                selectedTrxId = null;

                await renderRiwayat();
                await renderGrafik();
                await renderLaporan();
                alert('Data transaksi berhasil direvisi di Database!');
            } catch (error) {
                console.error('Error PUT Edit:', error);
                alert('Terjadi kesalahan saat mengedit data.');
            } finally {
                isSubmittingEdit = false;
                if (submitEditBtn) submitEditBtn.disabled = false;
            }
        });
    }

    // --- Aksi 5: Cetak Nota ---
    btnCetakNota.addEventListener('click', async () => {
        if (!selectedTrxId) return;

        const transactions = await checkAndUpdateDueStatus();
        const trx = transactions.find((item) => String(item.id) === String(selectedTrxId));
        if (!trx) return;

        notaId.textContent = trx.id;
        notaTanggalCetak.textContent = formatShortDate(new Date().toISOString());
        notaNasabah.textContent = trx.nama_nasabah;
        notaWa.textContent = trx.no_wa;
        notaKategori.textContent = trx.kategori;
        notaStatus.textContent = trx.status;
        notaTglMasuk.textContent = formatShortDate(trx.tanggal_masuk);
        notaTglKeluar.textContent = formatShortDate(trx.tanggal_keluar);
        notaNominal.textContent = formatRupiah(trx.nilai_pinjaman);

        window.print();
    });

    // --- Filter Grafik & Navigasi Detail Laporan ---
    if (grafikFilter) {
        grafikFilter.addEventListener('change', () => {
            renderGrafik();
        });
    }

    if (cardStatistikBulanan) {
        cardStatistikBulanan.addEventListener('click', () => {
            renderLaporan();
            modalDetailLaporan.classList.remove('hidden');
        });
    }

    if (btnBackLaporan) {
        btnBackLaporan.addEventListener('click', () => {
            modalDetailLaporan.classList.add('hidden');
        });
    }

    // =========================================================================
    // 6. INISIALISASI AWAL SAAT HALAMAN DIMUAT
    // =========================================================================
    renderRiwayat();
    renderGrafik();
    renderLaporan();
});