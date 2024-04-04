document.addEventListener("DOMContentLoaded", function() {
    var currentRow; // Biến để lưu trữ dòng hiện tại được chọn

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
            cell.onclick = function() {
                // Lấy dữ liệu từ các ô trong hàng được click
                // Hiển thị thông tin xe ở cột bên phải
                document.getElementById("carName").value = cells[2];
                document.getElementById("carImage").value = carImage;
                document.getElementById("carBrand").value = cells[3];
                document.getElementById("carPrice").value = cells[4];
                document.getElementById("carDescription").value = ""; // Không có dữ liệu mô tả trong bảng
                document.getElementById("contactPerson").value = cells[5];
                document.getElementById("contactNumber").value = cells[6];
                document.getElementById("contactEmail").value = cells[7];

                currentRow = newRow; // Lưu trữ dòng hiện tại được chọn
            }
            newRow.appendChild(cell);
        });

        // Thêm hàng mới vào danh sách xe
        carList.appendChild(newRow);
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

    // Hàm xóa hàng trong bảng
    function deleteRow(row) {
        row.parentNode.removeChild(row); // Xóa hàng khỏi bảng
        updateRowNumbers(); // Cập nhật lại số thứ tự
    }

    // Hàm cập nhật lại số thứ tự
    function updateRowNumbers() {
        var rows = document.querySelectorAll("#carList .row");
        rows.forEach(function(row, index) {
            var cells = row.querySelectorAll(".cell");
            cells[0].textContent = index + 1; // Cập nhật lại số thứ tự
        });
    }

    // Gắn sự kiện "click" vào nút "Xóa"
    document.getElementById("delete").addEventListener("click", function() {
        if (currentRow) {
            var confirmDelete = confirm("Bạn có muốn xóa không?"); // Thông báo xác nhận
            if (confirmDelete) {
                deleteRow(currentRow); // Xóa dòng hiện tại được chọn
                currentRow = null; // Đặt lại dòng hiện tại được chọn
            }
        }
    });
});
