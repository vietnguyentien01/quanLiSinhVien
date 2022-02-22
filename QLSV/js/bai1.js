/* 
    B1: tạo hàm showInfo
    B2: lấy thông tin sinh viên từ form
    B3: tạo đối tượng sinh viên và lưu thông tin vào đối tượng
    B4: tạo 2 phương thức tính tinhDTB, xepLoai
    B5: hiển thị lên UI
*/

function showInfo() {
  //Lấy thông tin
  var maSV = document.getElementById("txtMaSV").value;
  var tenSV = document.getElementById("txtTenSV").value;
  var loaiSV = document.getElementById("loaiSV").value;
  var diemToan = Number(document.getElementById("txtDiemToan").value);
  var diemVan = Number(document.getElementById("txtDiemVan").value);

  console.log(maSV, tenSV, loaiSV, diemToan, diemVan);

  var sinhVien = {
    //Thuộc tính (property)
    ma: maSV,
    ten: tenSV,
    loai: loaiSV,
    toan: diemToan,
    van: diemVan,
    // những hàm mà sinh viên cũng cần có => phương thức của đối tượng
    //this: con trỏ this => đại diện cho đối tượng => truy xuất tới các thuộc tính trong đối tượng
    tinhTB: function() {
      return (this.toan + this.van) / 2;
    },
    xepLoai: function(dtb) {
      if (dtb >= 8 && dtb <= 10) {
        return "Giỏi";
      } else {
        return "Chưa xác định";
      }
    }
  };

  hienThi(sinhVien);
}

function hienThi(sv) {
  document.getElementById("spanTenSV").innerHTML = sv.ten;
  document.getElementById("spanMaSV").innerHTML = sv.ma;
  document.getElementById("spanLoaiSV").innerHTML = sv.loai;
  document.getElementById("spanDTB").innerHTML = sv.tinhTB();

  //callback function: 1 hàm nhận vào tham số là 1 hàm khác
  document.getElementById("spanXepLoai").innerHTML = sv.xepLoai(sv.tinhTB());
}
