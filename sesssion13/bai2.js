let passengers = [
    {
        pnrCode: "VN001",
        passengerName: "Nguyen Van An",
        idNumber: "012345678901",
        flightNumber: "VN123",
        seatNumber: "12A",
        isCheckedIn: false
    },
    {
        pnrCode: "VN002",
        passengerName: "Tran Thi Binh",
        idNumber: "B1234567",
        flightNumber: "VN123",
        seatNumber: "12B",
        isCheckedIn: false
    }
];

let seats = ["12A", "12B", "12C", "14A", "14B", "14C"];

function findPassengerByPnr(pnrCode) {
    let passenger = passengers.find(function (item) {
        return item.pnrCode.toLowerCase() === pnrCode.toLowerCase();
    });
    return passenger;
}

function validateIdNumber(idNumber) {
    let cccdRegex = /^[0-9]{12}$/;
    let passportRegex = /^[A-Za-z][0-9]{7,8}$/;
    return cccdRegex.test(idNumber) || passportRegex.test(idNumber);
}

function isSeatTaken(flightNumber, seatNumber) {
    let passenger = passengers.find(function (item) {
        return (
            item.flightNumber === flightNumber &&
            item.seatNumber === seatNumber &&
            item.isCheckedIn === true
        );
    });

    return passenger !== undefined;
}

function assignSeat(flightNumber) {
    let seatNumber = "";
    seats.forEach(function (seat) {
        if (seatNumber === "" && !isSeatTaken(flightNumber, seat)) {
            seatNumber = seat;
        }
    });
    return seatNumber;
}

function displayPassengers() {
    console.log("========== DANH SACH HANH KHACH ==========");
    if (passengers.length === 0) {
        console.log("Chua co ho so hanh khach!");
        return;
    }

    console.log("PNR | Ten hanh khach | Giay to | Chuyen bay | Ghe | Trang thai");
    passengers.forEach(function (passenger) {
        console.log(`${passenger.pnrCode} | ${passenger.passengerName} | ${passenger.idNumber} | ${passenger.flightNumber} | ${passenger.seatNumber} | ${passenger.isCheckedIn ? "DA CHECK-IN" : "CHUA CHECK-IN"}`);
    });
}

function addPassenger() {
    let pnrCode = prompt("Nhap ma PNR: ");
    if (pnrCode === null || pnrCode.trim() === "") {
        console.log("Ma PNR khong duoc de trong!");
        return;
    }

    pnrCode = pnrCode.trim();
    if (findPassengerByPnr(pnrCode) !== undefined) {
        console.log("Ma PNR da ton tai!");
        return;
    }

    let passengerName = prompt("Nhap ho ten hanh khach: ");
    if (passengerName === null || passengerName.trim() === "") {
        console.log("Ho ten khong duoc de trong!");
        return;
    }
    passengerName = passengerName.trim();

    let idNumber = prompt("Nhap CCCD hoac ho chieu: ");
    if (idNumber === null || !validateIdNumber(idNumber.trim())) {
        console.log("Giay to khong hop le!");
        console.log("CCCD: 12 chu so.");
        console.log("Ho chieu: 1 chu cai va 7-8 chu so.");
        return;
    }

    idNumber = idNumber.trim();

    let existingId = passengers.find(function (item) {
        return item.idNumber.toLowerCase() === idNumber.toLowerCase();
    });

    if (existingId !== undefined) {
        console.log("Giay to nay da duoc dang ky!");
        return;
    }

    let flightNumber = prompt("Nhap so hieu chuyen bay: ");
    if (flightNumber === null || flightNumber.trim() === "") {
        console.log("So hieu chuyen bay khong duoc de trong!");
        return;
    }

    flightNumber = flightNumber.trim().toUpperCase();
    let newPassenger = {
        pnrCode: pnrCode,
        passengerName: passengerName,
        idNumber: idNumber,
        flightNumber: flightNumber,
        seatNumber: "",
        isCheckedIn: false
    };
    passengers.push(newPassenger);
    console.log("Them ho so hanh khach thanh cong!");
}

function checkInPassenger() {
    let pnrCode = prompt("Nhap ma PNR can check-in: ");
    if (pnrCode === null || pnrCode.trim() === "") {
        console.log("Ma PNR khong duoc de trong!");
        return;
    }

    let passenger = findPassengerByPnr(pnrCode.trim());
    if (passenger === undefined) {
        console.log("Khong tim thay ho so hanh khach!");
        return;
    }

    if (passenger.isCheckedIn === true) {
        console.log("Hanh khach da check-in truoc do!");
        displayBoardingPass(passenger);
        return;
    }

    if (!validateIdNumber(passenger.idNumber)) {
        console.log("Giay to tuy than khong hop le!");
        return;
    }

    let seatNumber = assignSeat(passenger.flightNumber);
    if (seatNumber === "") {
        console.log("Chuyen bay da het ghe!");
        return;
    }
    passenger.seatNumber = seatNumber;
    passenger.isCheckedIn = true;
    console.log("Xac thuc ho so thanh cong!");
    console.log("Check-in thanh cong!");
    displayBoardingPass(passenger);
}

function displayBoardingPass(passenger) {
    console.log("========== BOARDING PASS ==========");
    console.log(`Ma PNR: ${passenger.pnrCode}`);
    console.log(`Hanh khach: ${passenger.passengerName}`);
    console.log(`Chuyen bay: ${passenger.flightNumber}`);
    console.log(`So ghe: ${passenger.seatNumber}`);
    console.log(`Giay to: ${passenger.idNumber}`);
    console.log(`Trang thai: ${passenger.isCheckedIn ? "DA CHECK-IN" : "CHUA CHECK-IN"}`);
    console.log("===================================");
}

function searchPassenger() {
    let pnrCode = prompt("Nhap ma PNR can tra cuu: ");
    if (pnrCode === null || pnrCode.trim() === "") {
        console.log("Ma PNR khong duoc de trong!");
        return;
    }

    let passenger = findPassengerByPnr(pnrCode.trim());
    if (passenger === undefined) {
        console.log("Khong tim thay hanh khach!");
        return;
    }
    displayBoardingPass(passenger);
}

function main() {
    let choice;
    do {
        choice = prompt(`========== QUAN LY HANH KHACH SAN BAY ==========
1: Hien thi danh sach hanh khach.
2: Them ho so hanh khach.
3: Xac thuc ho so va check-in.
4: Tra cuu hanh khach theo ma PNR.
5: Thoat chuong trinh.
Nhap lua chon:`);

        switch (choice) {
            case "1":
                displayPassengers();
                break;

            case "2":
                addPassenger();
                break;

            case "3":
                checkInPassenger();
                break;

            case "4":
                searchPassenger();
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