let bookings = [
    {
        bookingCode: "CIN-001",
        customerName: "Nguyễn Văn An",
        movieTitle: "Ánh Trăng Cuối Phố",
        ticketCount: 2,
        pricePerTicket: 90000,
        totalAmount: 194400
    },
    {
        bookingCode: "CIN-002",
        customerName: "Trần Thị Bình",
        movieTitle: "Biệt Đội Sao Băng",
        ticketCount: 4,
        pricePerTicket: 90000,
        totalAmount: 349920
    },
    {
        bookingCode: "CIN-003",
        customerName: "Lê Minh Châu",
        movieTitle: "Mùa Hè Rực Lửa",
        ticketCount: 6,
        pricePerTicket: 110000,
        totalAmount: 641520
    }
];

function formatMoney(amount) {
    return new Intl.NumberFormat("vi-VN").format(amount) + " VNĐ";
}

function normalizeName(name) {
    let words = name.trim().toLowerCase().split(/\s+/);
    let result = "";
    for (let i = 0; i < words.length; i++) {
        result += words[i].charAt(0).toUpperCase() + words[i].slice(1);
        if (i < words.length - 1) {
            result += " ";
        }
    }
    return result;
}

function validateBookingCode(code) {
    if (code === "") {
        return "Chua nhap ma dat ve";
    }

    if (code.length < 6) {
        return "Do dai nho hon 6 ky tu";
    }

    if (!code.startsWith("CIN-")) {
        return 'Sai tien to "CIN-"';
    }

    if (/\s/.test(code)) {
        return "Ma dat ve chua khoang trang";
    }

    if (findBookingIndex(code) !== -1) {
        return "Ma dat ve da ton tai";
    }
    return "";
}

function findBookingIndex(code) {
    for (let i = 0; i < bookings.length; i++) {
        if (bookings[i].bookingCode === code) {
            return i;
        }
    }
    return -1;
}

function inputPositiveInteger(message) {
    while (true) {
        let value = prompt(message);
        if (value === null) {
            return null;
        }

        value = value.trim();
        if (value !== "" && /^\d+$/.test(value)) {
            let number = Number(value);
            if (Number.isSafeInteger(number) && number > 0) {
                return number;
            }
        }
        console.log("Du lieu khong hop le. Vui long nhap so nguyen > 0.");
    }
}

function calculateTotal(ticketCount, pricePerTicket) {
    let baseCost = ticketCount * pricePerTicket;
    let discount = 0;
    if (ticketCount >= 4) {
        discount = Math.round(baseCost * 0.1);
    }

    let serviceFee = Math.round((baseCost - discount) * 0.08);
    let totalAmount = baseCost - discount + serviceFee;
    return {
        baseCost: baseCost,
        discount: discount,
        serviceFee: serviceFee,
        totalAmount: totalAmount
    };
}

function displayInvoice(booking) {
    let result = calculateTotal(booking.ticketCount, booking.pricePerTicket);
    console.log(`========== HOA DON DAT VE ==========
Ma dat ve: ${booking.bookingCode}
Khach hang: ${booking.customerName}
Ten phim: ${booking.movieTitle}
So ve: ${booking.ticketCount}
Gia moi ve: ${formatMoney(booking.pricePerTicket)}
Chi phi co so: ${formatMoney(result.baseCost)}
Giam gia: ${formatMoney(result.discount)}
Phi dich vu: ${formatMoney(result.serviceFee)}
Tong thanh toan: ${formatMoney(result.totalAmount)}
====================================`);
}

function displayBookings(list) {
    if (list.length === 0) {
        console.log("Danh sach don dat ve trong");
        return;
    }

    let totalRevenue = 0;
    for (let i = 0; i < list.length; i++) {
        let booking = list[i];
        console.log((i + 1) + ". " + booking.bookingCode + " - " + booking.customerName + " - " + booking.movieTitle);
        console.log("   SL: " + booking.ticketCount + " | Gia: " + formatMoney(booking.pricePerTicket) + " | Tong TT: " + formatMoney(booking.totalAmount));
        totalRevenue += booking.totalAmount;
    }
    console.log("Tong: " + list.length + " don dat ve");
    console.log("Doanh thu: " + formatMoney(totalRevenue));
}

function showBookings() {
    displayBookings(bookings);
}

function addBooking() {
    let codeInput = prompt("Nhap ma dat ve:");
    if (codeInput === null) {
        console.log("Da huy thao tac them");
        return;
    }

    let bookingCode = codeInput.trim().toUpperCase();
    let error = validateBookingCode(bookingCode);
    if (error !== "") {
        console.log("Loi: " + error);
        return;
    }

    let customerName = "";
    while (true) {
        let nameInput = prompt("Nhap ten khach hang:");
        if (nameInput === null) {
            console.log("Da huy thao tac them");
            return;
        }

        nameInput = nameInput.trim();
        if (nameInput !== "") {
            customerName = normalizeName(nameInput);
            break;
        }
        console.log("Ten khach hang khong duoc de trong");
    }

    let movieTitle = "";
    while (true) {
        let movieInput = prompt("Nhap ten phim:");
        if (movieInput === null) {
            console.log("Da huy thao tac them");
            return;
        }

        movieInput = movieInput.trim();
        if (movieInput !== "") {
            movieTitle = normalizeName(movieInput);
            break;
        }
        console.log("Ten phim khong duoc de trong");
    }

    let ticketCount = inputPositiveInteger("Nhap so ve:");
    if (ticketCount === null) {
        console.log("Da huy thao tac them");
        return;
    }

    let pricePerTicket = inputPositiveInteger("Nhap gia moi ve:");
    if (pricePerTicket === null) {
        console.log("Da huy thao tac them");
        return;
    }

    let result = calculateTotal(ticketCount, pricePerTicket);
    let newBooking = {
        bookingCode: bookingCode,
        customerName: customerName,
        movieTitle: movieTitle,
        ticketCount: ticketCount,
        pricePerTicket: pricePerTicket,
        totalAmount: result.totalAmount
    };

    bookings.push(newBooking);
    console.log("Them don dat ve thanh cong");
    displayInvoice(newBooking);
}

function updateBooking() {
    let codeInput = prompt("Nhap ma dat ve can cap nhat:");
    if (codeInput === null) {
        console.log("Da huy cap nhat");
        return;
    }

    let bookingCode = codeInput.trim().toUpperCase();
    let index = findBookingIndex(bookingCode);
    if (index === -1) {
        console.log("Khong tim thay don dat ve co ma " + bookingCode);
        return;
    }

    let oldTotal = bookings[index].totalAmount;
    let ticketCount = inputPositiveInteger("Nhap so ve moi:");
    if (ticketCount === null) {
        console.log("Da huy cap nhat");
        return;
    }

    let pricePerTicket = inputPositiveInteger("Nhap gia moi moi ve:");
    if (pricePerTicket === null) {
        console.log("Da huy cap nhat");
        return;
    }

    let result = calculateTotal(ticketCount, pricePerTicket);
    bookings[index].ticketCount = ticketCount;
    bookings[index].pricePerTicket = pricePerTicket;
    bookings[index].totalAmount = result.totalAmount;

    console.log("Cap nhat don dat ve thanh cong");
    console.log("Tong thanh toan cu: " + formatMoney(oldTotal));
    console.log("Tong thanh toan moi: " + formatMoney(result.totalAmount));
}

function deleteBooking() {
    let codeInput = prompt("Nhap ma dat ve can xoa:");
    if (codeInput === null) {
        console.log("Da huy thao tac xoa");
        return;
    }

    let bookingCode = codeInput.trim().toUpperCase();
    let index = findBookingIndex(bookingCode);
    if (index === -1) {
        console.log("Khong tim thay don dat ve co ma " + bookingCode);
        return;
    }

    let confirmDelete = prompt("Ban co chac chan muon xoa? (Y/N)");
    if (confirmDelete === null ||
        confirmDelete.trim().toUpperCase() !== "Y") {
        console.log("Da huy thao tac xoa");
        console.log("So don dat ve hien tai: " + bookings.length);
        return;
    }
    bookings.splice(index, 1);
    console.log("Xoa don dat ve thanh cong");
    console.log("So don dat ve con lai: " + bookings.length);
}

function searchBooking() {
    let keywordInput = prompt("Nhap tu khoa ten phim:");
    if (keywordInput === null || keywordInput.trim() === "") {
        console.log("Chua nhap tu khoa tim kiem");
        return;
    }
    let keyword = keywordInput.trim().toLowerCase();
    let result = [];
    for (let i = 0; i < bookings.length; i++) {
        if (bookings[i].movieTitle.toLowerCase().includes(keyword)) {
            result.push(bookings[i]);
        }
    }
    if (result.length === 0) {
        console.log("Khong tim thay don dat ve phu hop");
        return;
    }
    console.log("Ket qua tim kiem:");
    displayBookings(result);
}

function main() {
    let choice = "";
    do {
        let input = prompt(`=====================================================
  HỆ THỐNG QUẢN LÝ ĐẶT VÉ MOONLIGHT CINEMA
=====================================================
1. Hiển thị danh sách đơn đặt vé
2. Thêm đơn đặt vé mới
3. Cập nhật đơn đặt vé
4. Xóa đơn đặt vé
5. Tìm kiếm đơn đặt vé theo tên phim
0. Thoát chương trình
=====================================================
Vui lòng nhập lựa chọn của bạn (0 - 5):`);
        if (input === null) {
            console.log("Lua chon khong hop le");
            continue;
        }

        choice = input.trim();
        if (!/^[0-5]$/.test(choice)) {
            console.log("Lua chon khong hop le. Vui long chon tu 0 den 5");
            continue;
        }

        switch (choice) {
            case "1":
                showBookings();
                break;

            case "2":
                addBooking();
                break;

            case "3":
                updateBooking();
                break;

            case "4":
                deleteBooking();
                break;

            case "5":
                searchBooking();
                break;

            case "0":
                console.log("Cam on ban da su dung chuong trinh!");
                break;

            default:
                console.log("Lua chon khong hop le");
                break;
        }
    } while (choice !== "0");
}
main();