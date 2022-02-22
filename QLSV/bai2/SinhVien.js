/* 
Khai báo các thuộc tính/phương thức chung cho tất cả đối tượng sinh viên
*/

function SinhVien(
  maSV,
  tenSV,
  email,
  matKhau,
  ngaySinh,
  khoaHoc,
  toan,
  ly,
  hoa
) {
  //Thuộc tính (property)
  this.maSV = maSV;
  this.tenSV = tenSV;
  this.email = email;
  this.matKhau = matKhau;
  this.ngaySinh = ngaySinh;
  this.khoaHoc = khoaHoc;
  this.toan = toan;
  this.ly = ly;
  this.hoa = hoa;
  this.dtb = 0;

  //Phương thức
  this.tinhDTB = function() {
    this.dtb = (this.toan + this.ly + this.hoa) / 3;
  };
}
