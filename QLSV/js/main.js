// number, string, boolean (chỉ chứa 1 giá trị)
// array, object (chứa nhiều giá trị)

var CD = [
  "Tên",
  "2000",
  "123 mặt đất",
  "5656565",
  "Tên",
  "2000",
  "123 mặt đất",
  "5656565",
  "Tên",
  "2000",
  "123 mặt đất",
  "5656565",
  "Tên",
  "2000",
  "123 mặt đất",
  "5656565"
];

//object
//Khởi tạo
var userObject = {
  //thuộc tính (property) - thông tin / đặc điểm của đối tượng
  id: "45678",
  name: "Nguyễn Thị Công Dân",
  age: 20,
  address: "123 mặt đất",
  //phương thức (method)
  checkBH: function() {
    console.log("Thông tin bảo hiểm");
  }
};

//Sử dụng
// Truy xuất thuộc tính của đối tượng
console.log(userObject.name);
// Truy xuất phương thức
userObject.checkBH();
