let tickets = [
    {
        pnr: "VN001",
        passengerName: "Nguyen Van An",
        flightCode: "VN123",
        seat: "A01",
        ticketClass: "ECONOMY",
        baggageWeight: 25,
        baggageFee: 0,
        status: "BOOKED"
    },
    {
        pnr: "VN002",
        passengerName: "Tran Thi Binh",
        flightCode: "VN456",
        seat: "B02",
        ticketClass: "BUSINESS",
        baggageWeight: 20,
        baggageFee: 0,
        status: "BOOKED"
    },
    {
        pnr: "VN003",
        passengerName: "Le Van Cuong",
        flightCode: "VN789",
        seat: "C03",
        ticketClass: "ECONOMY",
        baggageWeight: 15,
        baggageFee: 0,
        status: "CHECKED_IN"
    }
];

function findTicketByPnr(pnr) {
    let ticket = tickets.find(function (item) {
        return item.pnr.toLowerCase() === pnr.toLowerCase();
    });
    return ticket;
}

function calculateExcessBaggageFee(ticketClass, baggageWeight) {
    let freeWeight = 20;
    if (ticketClass === "BUSINESS") {
        freeWeight = 30;
    }

    let excessWeight = baggageWeight - freeWeight;
    if (excessWeight < 0) {
        excessWeight = 0;
    }

    let baggageFee = excessWeight * 50000;
    return baggageFee;
}

function listTickets() {
    console.log("========== DANH SACH VE MAY BAY ==========");
    console.log("PNR | Ten hanh khach | Chuyen bay | Ghe | Hang ve | Trang thai");
    tickets.forEach(function (ticket) {
        console.log(`${ticket.pnr} | ${ticket.passengerName} | ${ticket.flightCode} | ${ticket.seat} | ${ticket.ticketClass} | ${ticket.status}`);
    });
}

function displayBoardingPass(ticket) {
    console.log("========== BOARDING PASS ==========");
    console.log(`Ma PNR: ${ticket.pnr}`);
    console.log(`Hanh khach: ${ticket.passengerName}`);
    console.log(`Chuyen bay: ${ticket.flightCode}`);
    console.log(`So ghe: ${ticket.seat}`);
    console.log(`Hang ve: ${ticket.ticketClass}`);
    console.log(`Hanh ly: ${ticket.baggageWeight} kg`);
    console.log(`Phi hanh ly: ${ticket.baggageFee.toLocaleString("vi-VN")} VND`);
    console.log(`Trang thai: ${ticket.status}`);
    console.log("===================================");
}

function checkIn() {
    let pnr = prompt("Nhap ma PNR: ");
    if (pnr === null || pnr.trim() === "") {
        console.log("Ma PNR khong duoc de trong!");
        return;
    }

    let ticket = findTicketByPnr(pnr.trim());
    if (ticket === undefined) {
        console.log("Khong tim thay ve!");
        return;
    }

    if (ticket.status === "CANCELLED") {
        console.log("Ve da bi huy, khong the check-in!");
        return;
    }

    if (ticket.status === "CHECKED_IN") {
        console.log("Ve da check-in truoc do!");
        displayBoardingPass(ticket);
        return;
    }

    let baggageInput = prompt("Nhap khoi luong hanh ly (kg): ");
    if (baggageInput === null || baggageInput.trim() === "" || isNaN(baggageInput) || Number(baggageInput) < 0) {
        console.log("Khoi luong hanh ly khong hop le!");
        return;
    }

    let baggageWeight = Number(baggageInput);
    ticket.baggageWeight = baggageWeight;
    ticket.baggageFee = calculateExcessBaggageFee(ticket.ticketClass, ticket.baggageWeight);
    ticket.status = "CHECKED_IN";
    console.log("Check-in thanh cong!");
    console.log(`Khoi luong hanh ly: ${ticket.baggageWeight} kg`);
    console.log(`Phi hanh ly: ${ticket.baggageFee.toLocaleString("vi-VN")} VND`);
    displayBoardingPass(ticket);
}

function searchTicket() {
    let searchValue = prompt("Nhap ma PNR hoac ten hanh khach: ");
    if (searchValue === null || searchValue.trim() === "") {
        console.log("Thong tin tra cuu khong duoc de trong!");
        return;
    }

    let ticket = tickets.find(function (item) {
        return (item.pnr.toLowerCase() === searchValue.trim().toLowerCase() || item.passengerName.toLowerCase().includes(searchValue.trim().toLowerCase()));
    });

    if (ticket === undefined) {
        console.log("Khong tim thay ve!");
    } else {
        displayBoardingPass(ticket);
    }
}

function cancelTicket() {
    let pnr = prompt("Nhap ma PNR can huy: ");
    if (pnr === null || pnr.trim() === "") {
        console.log("Ma PNR khong duoc de trong!");
        return;
    }

    let ticket = findTicketByPnr(pnr.trim());
    if (ticket === undefined) {
        console.log("Khong tim thay ve!");
        return;
    }

    if (ticket.status === "CANCELLED") {
        console.log("Ve da duoc huy truoc do!");
        return;
    }
    ticket.status = "CANCELLED";
    console.log(`Da huy ve ${ticket.pnr} thanh cong!`);
}

function main() {
    let choice;
    do {
        choice = prompt(`========== QUAN LY VE MAY BAY ==========
1: Hiển thị danh sách vé chuyến bay dạng bảng.
2: Tiếp nhận check-in, cân hành lý và tính phụ thu.
3: Tra cứu vé theo mã PNR hoặc tên khách hàng.
4: Hủy vé / Đổi trạng thái vé.
5: Thoát chương trình.
Nhap lua chon:`);

        switch (choice) {
            case "1":
                listTickets();
                break;

            case "2":
                checkIn();
                break;

            case "3":
                searchTicket();
                break;

            case "4":
                cancelTicket();
                break;

            case "5":
                console.log("Ket thuc chuong trinh!");
                break;

            default:
                console.log("Lua chon khong hop le!");
        }
    } while (menuChoice !== "5");
}
main();