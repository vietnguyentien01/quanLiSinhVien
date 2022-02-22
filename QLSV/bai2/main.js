//Global
var danhSachSV = new DanhSachSinhVien();
var validation = new Validation();

//Lấy danh sách khi load lại trang
getLocalStorage();

// Hàm rút gọn cú pháp
function getEle(id) {
  return document.getElementById(id);
}

function themSinhVien() {
  //Lấy dữ liệu từ form
  var maSV = getEle("txtMaSV").value;
  var tenSV = getEle("txtTenSV").value;
  var email = getEle("txtEmail").value;
  var matKhau = getEle("txtPass").value;
  var ngaySinh = getEle("txtNgaySinh").value;
  var khoaHoc = getEle("khSV").value;
  var toan = getEle("txtDiemToan").value;
  var ly = getEle("txtDiemLy").value;
  var hoa = getEle("txtDiemHoa").value;

  // Kiểm tra dữ liệu(validation)
  // Khởi tạo isValid = true => giả sử dữ liệu hợp
  // & => cộng theo BIT (01010101)
  var isValid = true;
  // isValid(mới) = isValid(Cũ) & 1(true)
  // Kiểm tra mã: không được trống, không được trùng
  isValid &=
    validation.checkEmpty(
      maSV,
      "spanMaSV",
      "Mã sinh viên không được để trống"
    ) &&
    validation.checkID(
      maSV,
      "spanMaSV",
      "Mã sinh viên không được trùng",
      danhSachSV.mangSV
    );

  //Kiểm tra tên: không được trống, phải là ký tự chữ(không có số, không có ký tự đặc biệt)
  isValid &=
    validation.checkEmpty(
      tenSV,
      "spanTenSV",
      "Tên sinh viên không được để trống"
    ) &&
    validation.checkName(tenSV, "spanTenSV", "Tên sinh viên phải là chữ");

  // Kiểm tra Email: định dạng email
  isValid &= validation.checkEmail(
    email,
    "spanEmailSV",
    "Email chưa đúng định dạng"
  );

  // Kiểm tra pass: định dạng pass (có 1 chữ, 1 in hoa, 1 số, 1 đặc biệt, độ dài)
  isValid &= validation.checkPass(
    matKhau,
    "spanMatKhau",
    "Mật khẩu chưa hợp lệ"
  );

  // Kiểm tra ngày sinh
  isValid &= validation.checkDate(
    ngaySinh,
    "spanNgaySinh",
    "Ngày tháng năm sinh chưa hợp lệ"
  );

  // Kiểm tra khóa học
  isValid &= validation.checkSelect(
    "khSV",
    "spanKhoaHoc",
    "Bạn chưa chọn khóa học"
  );

  // Kiểm tra toán
  isValid &= validation.checkMark(
    toan,
    "spanToan",
    "Điểm toán chưa hợp lệ"
  );

  // Kiểm tra lý
  isValid &= validation.checkMark(ly, "spanLy", "Điểm chưa lý hợp lệ");

  // Kiểm tra hóa
  isValid &= validation.checkMark(hoa, "spanHoa", "Điểm hóa chưa hợp lệ");
  if (isValid) {
    //toàn bộ dữ liệu hợp lệ
    //Tạo thể hiện của lớp SinhVien
    var sv = new SinhVien(
      maSV,
      tenSV,
      email,
      matKhau,
      ngaySinh,
      khoaHoc,
      Number(toan),
      Number(ly),
      Number(hoa)
    );
    sv.tinhDTB();
    // console.log(sv);

    danhSachSV.themSV(sv);

    // console.log(danhSachSV.mangSV);
    hienThiTable(danhSachSV.mangSV);

    // Khi mảng sinh viên bị thay (thêm, xóa, sửa sv trong mảng) => lưu xuống localStorage
    setLocalStorage(danhSachSV.mangSV);
  }
}

function hienThiTable(mangSV) {
  // content: chứa các thẻ tr, mỗi tr chứa thông tin của 1 sinh viên
  var content = "";
  // for
  // map(): hàm tạo sẵn của JS giúp duyệt mảng
  //

  mangSV.map(function(sv, index) {
    content += `<tr>
            <td>${sv.maSV}</td>
            <td>${sv.tenSV}</td>
            <td>${sv.email}</td>
            <td>${sv.ngaySinh}</td>
            <td>${sv.khoaHoc}</td>
            <td>${sv.dtb}</td>
            <td>
              <button class="btn btn-danger" onclick = "xoaSinhVien('${sv.maSV}')"> Xóa </button>
              <button class="btn btn-info" onclick = "xemChiTiet('${sv.maSV}')"> Xem </button>
            </td>
          </tr>
    `;
  });

  getEle("tbodySinhVien").innerHTML = content;
}

// localStorage: kho lưu data của browser (data: tạm thời - giỏ hàng, không cần bảo mật)

function setLocalStorage(mangSV) {
  // JSON: là đối tượng của JS dùng để chứa các method xử lý dữ liệu json
  // stringify: chuyển mảng sang json
  localStorage.setItem("DSSV", JSON.stringify(mangSV));
}

function getLocalStorage() {
  // parse: chuyển từ json về mảng
  // Kiểm tra xem có localStorage không
  if (localStorage.getItem("DSSV") != null) {
    //  nếu không null => có localStorage
    danhSachSV.mangSV = JSON.parse(localStorage.getItem("DSSV"));
    hienThiTable(danhSachSV.mangSV);
  }
}

/* 
  Xóa sinh viên => xóa phần tử khỏi mảng
  1. Tìm được vị trí (index) phần tử
  2. maSV => tìm vị trí sv trong mảng
  3. Sử dụng hàm của js để xóa phần tử khỏi mảng
*/

//Xóa khi người dùng click button xóa
function xoaSinhVien(ma) {
  console.log(ma);
  danhSachSV.xoaSV(ma);
  setLocalStorage(danhSachSV.mangSV);
  getLocalStorage();
}

/* 
  Cập nhật
  Luồng 1: Xem thông tin chi tiết
  1. Tìm vị trí (ma)
  2. Trả về sv cần xem thông tin
  3. Hiển thị thông tin lên UI
  Luồng 2: Cập nhật thông tin

*/

function xemChiTiet(ma) {
  console.log(ma);
  var viTri = danhSachSV.timViTri(ma);
  if (viTri > -1) {
    var sv = danhSachSV.mangSV[viTri];
    getEle("txtMaSV").value = sv.maSV;
    getEle("txtMaSV").disabled = true;
    getEle("txtTenSV").value = sv.tenSV;
    getEle("txtEmail").value = sv.email;
    getEle("txtPass").value = sv.matKhau;
    getEle("txtNgaySinh").value = sv.ngaySinh;
    getEle("khSV").value = sv.khoaHoc;
    getEle("txtDiemToan").value = sv.toan;
    getEle("txtDiemLy").value = sv.ly;
    getEle("txtDiemHoa").value = sv.hoa;
  } else {
    console.log("Chức năng xem : không tìm thấy sv");
  }
}

function capNhat() {
  // Lấy dữ liệu từ form
  // Mã SV không được đổi
  var maSV = getEle("txtMaSV").value;
  var tenSV = getEle("txtTenSV").value;
  var email = getEle("txtEmail").value;
  var matKhau = getEle("txtPass").value;
  var ngaySinh = getEle("txtNgaySinh").value;
  var khoaHoc = getEle("khSV").value;
  var toan = getEle("txtDiemToan").value;
  var ly = getEle("txtDiemLy").value;
  var hoa = getEle("txtDiemHoa").value;

  // tạo thể hiện lớp sinh viên
  var sv = new SinhVien(
    maSV,
    tenSV,
    email,
    matKhau,
    ngaySinh,
    khoaHoc,
    toan,
    ly,
    hoa
  );
  sv.tinhDTB();

  danhSachSV.capNhatSV(sv);
  setLocalStorage(danhSachSV.mangSV);
  getLocalStorage();
}

function resetForm() {
  getEle("formQLSV").reset();
  getEle("txtMaSV").disabled = false;
}

function timKiem() {
  var tk = getEle("txtSearch").value;
  var mangTK = danhSachSV.timKiemTen(tk);
  hienThiTable(mangTK);
}
getEle("btnSearch").onclick = timKiem;
