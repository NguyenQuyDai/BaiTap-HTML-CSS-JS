document.addEventListener("DOMContentLoaded", function() {
    // Gắn một sự kiện "click" vào nút "Lưu"
    document.getElementById("saveButton").addEventListener("click", function() {
        // Lấy giá trị nhập vào từ các trường trong biểu mẫu
        var carName = document.getElementById("carName").value;
        var carImage = document.getElementById("carImage").value;
        var carBrand = document.getElementById("carBrand").value;
        var carPrice = document.getElementById("carPrice").value;
        var carDescription = document.getElementById("carDescription").value;
        var contactPerson = document.getElementById("contactPerson").value;
        var contactNumber = document.getElementById("contactNumber").value;
        var contactEmail = document.getElementById("contactEmail").value;

        // Tạo một hàng mới cho danh sách xe
        var carList = document.getElementById("carList");
        var newRow = document.createElement("div");
        newRow.classList.add("row");

        // Tạo các ô cho hàng mới
        var cells = [
            carList.childElementCount + 1, // Số thứ tự
            `<img src="${carImage}" alt="Car Image">`, // Hình Ảnh
            carName, // Tên Xe
            carBrand, // Hãng Xe
            carPrice, // Giá Tiền
            contactPerson, // Người liên hệ
            contactNumber, // Điện thoại
            contactEmail // Email
        ];

        // Điền dữ liệu vào các ô
        cells.forEach(function(cellData) {
            var cell = document.createElement("div");
            cell.classList.add("cell");
            cell.innerHTML = cellData;
            newRow.appendChild(cell);
        });

        // Thêm hàng mới vào danh sách xe
        carList.appendChild(newRow);
    });
});

document.addEventListener("DOMContentLoaded", function() {
    // Xóa xe khi nhấn nút "Xóa"
    document.getElementById("delete").addEventListener("click", function() {
        // Hiển thị hộp thoại xác nhận
        var confirmation = confirm("Bạn có chắc chắn muốn xóa xe này?");
        if (confirmation) {
            // Xóa hàng đang được chọn (nếu có)
            var selectedRow = document.querySelector("#carList .row.selected");
            if (selectedRow) {
                selectedRow.remove();
            }
        }
    });

    // Tìm kiếm xe khi người dùng nhập vào ô tìm kiếm
    document.querySelector(".search-container input[type='text']").addEventListener("input", function() {
        var searchTerm = this.value.toLowerCase();
        var rows = document.querySelectorAll("#carList .row");

        rows.forEach(function(row) {
            var cells = row.querySelectorAll(".cell");
            var found = false;
            cells.forEach(function(cell) {
                var cellText = cell.textContent.toLowerCase();
                if (cellText.includes(searchTerm)) {
                    found = true;
                }
            });
            if (found) {
                row.style.display = ""; // Hiển thị hàng nếu có từ khóa tìm kiếm
            } else {
                row.style.display = "none"; // Ẩn hàng nếu không có từ khóa tìm kiếm
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    // Lấy danh sách các hàng trong bảng xe
    var rows = document.querySelectorAll("#carList .row");

    // Đặt sự kiện "click" cho mỗi hàng
    rows.forEach(function(row) {
        row.addEventListener("click", function() {
            // Lấy dữ liệu từ các ô trong hàng được click
            var cells = row.querySelectorAll(".cell");

            // Hiển thị thông tin xe ở cột bên phải
            document.getElementById("carName").value = cells[2].innerText;
            document.getElementById("carImage").value = cells[1].querySelector("img").src;
            document.getElementById("carBrand").value = cells[3].innerText;
            document.getElementById("carPrice").value = cells[4].innerText;
            document.getElementById("carDescription").value = ""; // Không có dữ liệu mô tả trong bảng
            document.getElementById("contactPerson").value = cells[5].innerText;
            document.getElementById("contactNumber").value = cells[6].innerText;
            document.getElementById("contactEmail").value = cells[7].innerText;

            // Xóa lớp 'selected' của tất cả các hàng khác
            var allRows = document.querySelectorAll("#carList .row");
            allRows.forEach(function(row) {
                row.classList.remove("selected");
            });

            // Thêm lớp 'selected' cho hàng được click để làm nổi bật
            row.classList.add("selected");
            console.log("Click row");
        });
    });
});
