const required = require("supertest"); // import thư viện supertest
let access_token = ""; //khai báo biến access_token

//code login để lấy access_token để call api create product
// khi chạy tất cả các test case thì không thêm .only => describe
// khi chạy 1 test case thì thêm .only => describe.only
describe.only("Login", () => {
  //khai báo biến body kiểu obj có 2 trường là phone và password (request body)
  const body = {
    phone: "0932323232", // số điện thoại đăng nhập 
    password: "Abc@123456", //mật khẩu đăng nhập
  };

  //viết code test login (phone và password đều đúng  => trả ra HTTP status 201)
  it("login success", async () => {
    //khai báo biến response nhận giá trị response khi call api login trả về
    const response = await required( //dùng required của thư viện supertest để call api
      `https://gce.onedev.top/api/v1/auth/sign-in` //link api login
    )
      .post("") //phương thức post
      .send(body); //gửi body request lên
    access_token = response._body.access_token; //biến access_token nhận giá trị access_token từ response trả ra khi login thành công
  });
});


//code test create product with empty name
describe.only('Create product with empty name',  () => {
    //khai báo biến body kiểu obj có 7 trường là name, description, images, price, amount, percent_discount, product_category_id, user_id (request body)
  const body = {
    name: "", //name rỗng
    description: "Siêu máy tính MSI Gaming Raider GE77HX 12UHS-229VN đích thực là một con quái vật cấu hình với những thông số mạnh nhất có thể đi cùng một thiết kế đẹp khó cưỡng. Hãy cùng xem bộ vi xử lý Intel Core i9 12900HX và card đồ họa RTX 3080 Ti có thể mang đến những trải nghiệm đỉnh cao như thế nào.",
    images: [
      {
        name: "25",
        image_url: "https://gce.onedev.top/uploads/86b9f019a4efea10248fadb7428384e22.jpg",
        resource_type: "products",
        resource_id: "",
        description: ""
      }
    ],
    price: 126990000,
    amount: 88893000,
    percent_discount: 30,
    product_category_id: "172c555d-1ff9-45c3-bd01-464b779dbb75",
    user_id: "",
    organization_id: "24d7e420-beb3-494d-a5e0-fa3a7421c86e",
  }
    //viết code test create product with empty name (mong đợi trả ra status 400)
    it("should return 400", async () => {
        //khai báo biến response nhận giá trị response khi call api create product trả về
      const response = await required(`https://gce.onedev.top/api/v1/e-commerce/products`) //link api create product dùng required của thư viện supertest để call api
      .post("") //phương thức post
      .send(body) //gửi body request lên
      .set('Authorization', `Bearer ${access_token}`); //set header Authorization với giá trị access_token
      expect(response.statusCode).toBe(400); //so sánh http status trả ra 400 => test case pass (name rỗng không thể tạo product thành công)
   
    })
});

//code test create product success with name not empty and length < 255
describe.only('Create product tests success',  () => {
    //khai báo biến body kiểu obj có 7 trường là name, description, images, price, amount, percent_discount, product_category_id, user_id (request body)
  const body = {
    name: "Laptop MSI Gaming Raider GE77HX 12UHS-229VN i9 12900HX/64GB/2TB/17.3UHD/Nvidia RTX 3080Ti 16GB/Win11",
    description: "Siêu máy tính MSI Gaming Raider GE77HX 12UHS-229VN đích thực là một con quái vật cấu hình với những thông số mạnh nhất có thể đi cùng một thiết kế đẹp khó cưỡng. Hãy cùng xem bộ vi xử lý Intel Core i9 12900HX và card đồ họa RTX 3080 Ti có thể mang đến những trải nghiệm đỉnh cao như thế nào.",
    images: [
      {
        name: "25",
        image_url: "https://gce.onedev.top/uploads/86b9f019a4efea10248fadb7428384e22.jpg",
        resource_type: "products",
        resource_id: "",
        description: ""
      }
    ],
    price: 126990000,
    amount: 88893000,
    percent_discount: 30,
    product_category_id: "172c555d-1ff9-45c3-bd01-464b779dbb75",
    user_id: "",
    organization_id: "24d7e420-beb3-494d-a5e0-fa3a7421c86e",
  }
    //viết code test create product success (mong đợi kết quả HTTP status 201)
    it("should return 201", async () => {
        //khai báo biến response nhận giá trị response khi call api create product trả về
      const response = await required(`https://gce.onedev.top/api/v1/e-commerce/products`) //link api create product dùng required của thư viện supertest để call api
      .post("") //phương thức post
      .send(body) //gửi body request lên
      .set('Authorization', `Bearer ${access_token}`); //set header Authorization với giá trị access_token
      expect(response.statusCode).toBe(201); //so sánh http status trả ra 201 => test case pass (tạo product thành công)
      expect(response.body.name).toBe(body.name); //kiểm tra response trả ra name có đúng name gửi lên không
    })
});

//code test create product success with name is length > 255
describe.only('Create product tests success',  () => {
    //khai báo biến body kiểu obj có 7 trường là name, description, images, price, amount, percent_discount, product_category_id, user_id (request body)
  const body = {
    name: "Laptop MSI Gaming Raider GE77HX 12UHS-229VN i9 12900HX/64GB/2TB/17.3UHD/Nvidia RTX 3080Ti 16GB/Win11Laptop MSI Gaming Raider GE77HX 12UHS-229VN i9 12900HX/64GB/2TB/17.3UHD/Nvidia RTX 3080Ti 16GB/Win11Laptop MSI Gaming Raider GE77HX 12UHS-229VN i9 12900HX/64GB/2TB/17.3UHD/Nvidia RTX 3080Ti 16GB/Win11Laptop MSI Gaming Raider GE77HX 12UHS-229VN i9 12900HX/64GB/2TB/17.3UHD/Nvidia RTX 3080Ti 16GB/Win11Laptop MSI Gaming Raider GE77HX 12UHS-229VN i9 12900HX/64GB/2TB/17.3UHD/Nvidia RTX 3080Ti 16GB/Win11Laptop MSI Gaming Raider GE77HX 12UHS-229VN i9 12900HX/64GB/2TB/17.3UHD/Nvidia RTX 3080Ti 16GB/Win11Laptop MSI Gaming Raider GE77HX 12UHS-229VN i9 12900HX/64GB/2TB/17.3UHD/Nvidia RTX 3080Ti 16GB/Win11",
    description: "Siêu máy tính MSI Gaming Raider GE77HX 12UHS-229VN đích thực là một con quái vật cấu hình với những thông số mạnh nhất có thể đi cùng một thiết kế đẹp khó cưỡng. Hãy cùng xem bộ vi xử lý Intel Core i9 12900HX và card đồ họa RTX 3080 Ti có thể mang đến những trải nghiệm đỉnh cao như thế nào.",
    images: [
      {
        name: "25",
        image_url: "https://gce.onedev.top/uploads/86b9f019a4efea10248fadb7428384e22.jpg",
        resource_type: "products",
        resource_id: "",
        description: ""
      }
    ],
    price: 126990000,
    amount: 88893000,
    percent_discount: 30,
    product_category_id: "172c555d-1ff9-45c3-bd01-464b779dbb75",
    user_id: "",
    organization_id: "24d7e420-beb3-494d-a5e0-fa3a7421c86e",
  }
    //viết code test create product with name is length > 255 (mong đợi kết quả HTTP status 400)
    it("should return 400", async () => {
        //khai báo biến response nhận giá trị response khi call api create product trả về
      const response = await required(`https://gce.onedev.top/api/v1/e-commerce/products`) //link api create product dùng required của thư viện supertest để call api
      .post("") //phương thức post
      .send(body) //gửi body request lên
      .set('Authorization', `Bearer ${access_token}`); //set header Authorization với giá trị access_token
      expect(response.statusCode).toBe(400); //so sánh http status trả ra 400 => test case pass (name rỗng không thể tạo product thành công)
    })
});