function Validation() {
  this.checkEmpty = function(value, spanID, message) {
    //Kiểm tra rỗng
    if (value.trim() == "") {
      //giá trị rỗng => không hợp lệ =>thông báo lỗi
      document.getElementById(spanID).innerHTML = message;
      document.getElementById(spanID).style.display = "block";
      return false;
    }

    // hợp lệ
    document.getElementById(spanID).innerHTML = "";
    document.getElementById(spanID).style.display = "none";
    return true;
  };

  this.checkID = function(value, spanID, message, mangSV) {
    //   giả sử ID chưa có trong mangSV
    var isExist = false;
    // Kiểm chứng
    // map() => trả về 1 mảng mới, đi hết mảng mới dừng bấ chấp có return hay không
    // some() => dựa vào điều kiện so sánh và trả về true/false
    // khi duyệt mảng nếu tìm thấy sv đầu tiên nào trong mảng bị trùng id thì return và dừng duyệt mảng
    isExist = mangSV.some(function(sv, index) {
      // return kết quả của biểu thức so sánh
      //   trim() => xóa ký tự khoảng trắng trước và sau của chuỗi chữ
      return value.trim() == sv.maSV;
    });

    if (isExist) {
      // có id bị trùng => không hợp lệ
      document.getElementById(spanID).innerHTML = message;
      document.getElementById(spanID).style.display = "block";
      return false;
    }

    // hợp lệ
    document.getElementById(spanID).innerHTML = "";
    document.getElementById(spanID).style.display = "none";
    return true;
  };

  this.checkName = function(value, spanID, message) {
    var pattern =
      "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
      "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
      "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$";

    var reg = new RegExp(pattern);
    if (reg.test(value)) {
      // hợp lệ
      document.getElementById(spanID).innerHTML = "";
      document.getElementById(spanID).style.display = "none";
      return true;
    }
    document.getElementById(spanID).innerHTML = message;
    document.getElementById(spanID).style.display = "block";
    return false;
  };

  this.checkEmail = function(value, spanID, message) {
    var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (pattern.test(value)) {
      //   hợp lệ
      document.getElementById(spanID).innerHTML = "";
      document.getElementById(spanID).style.display = "none";
      return true;
    }
    document.getElementById(spanID).innerHTML = message;
    document.getElementById(spanID).style.display = "block";
    return false;
  };

  this.checkPass = function(value, spanID, message) {
    var pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,12}$/;
    if (value.match(pattern)) {
      // hợp lệ
      document.getElementById(spanID).innerHTML = "";
      document.getElementById(spanID).style.display = "none";
      return true;
    }
    document.getElementById(spanID).innerHTML = message;
    document.getElementById(spanID).style.display = "block";
    return false;
  };

  this.checkDate = function(date, spanID, message) {
    var dob = new Date(date);
    var currentDate = new Date();
    var age = currentDate.getFullYear() - dob.getFullYear();
    if (age > 0) {
      // hợp lệ
      document.getElementById(spanID).innerHTML = "";
      document.getElementById(spanID).style.display = "none";
      return true;
    }
    document.getElementById(spanID).innerHTML = message;
    document.getElementById(spanID).style.display = "block";
    return false;
  };

  this.checkSelect = function(selectID, spanID, message) {
    var index = document.getElementById(selectID).selectedIndex;
    if (index != 0) {
      // hợp lệ
      document.getElementById(spanID).innerHTML = "";
      document.getElementById(spanID).style.display = "none";
      return true;
    }
    document.getElementById(spanID).innerHTML = message;
    document.getElementById(spanID).style.display = "block";
    return false;
  };

  this.checkMark = function(value, spanID, message) {
    var pattern = /^(\d{1,2}(\.\d{1,2})?)$/;
    if (value.match(pattern) && value >= 0 && value <= 10) {
      // hợp lệ
      document.getElementById(spanID).innerHTML = "";
      document.getElementById(spanID).style.display = "none";
      return true;
    }
    document.getElementById(spanID).innerHTML = message;
    document.getElementById(spanID).style.display = "block";
    return false;
  };
}
