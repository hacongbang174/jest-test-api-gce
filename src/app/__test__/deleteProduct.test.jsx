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


//code test delete product with id false
describe.only('delete product with id false',  () => {
    //khai báo biến id = "1" (id sai)
    const id = "1";

    //viết code test update product with id false (mong đợi trả ra status 404)
    it("should return 404", async () => {
        //khai báo biến response nhận giá trị response khi call api update product trả về
      const response = await required(`https://gce.onedev.top/api/v1/e-commerce/products/${id}`) //link api update product dùng required của thư viện supertest để call api truyền vào id sai
      .delete("") //phương thức delete
      .send()
      .set('Authorization', `Bearer ${access_token}`); //set header Authorization với giá trị access_token
      expect(response.statusCode).toBe(404); //so sánh http status trả ra 404 => test case pass (id sai không thể update product thành công)
   
    })
});

//code test delete product with id true
describe.only('delete product with id true',  () => {
    //khai báo biến id
    const id = "ef47248a-d777-4508-be48-0a69d9db569d";

    //viết code test delete product with id true (mong đợi trả ra status 200)
    it("should return 200", async () => {
        //khai báo biến response nhận giá trị response khi call api delete product trả về
      const response = await required(`https://gce.onedev.top/api/v1/e-commerce/products/${id}`) //link api delete product dùng required của thư viện supertest để call api truyền vào id sai
      .delete("") //phương thức delete
      .send()
      .set('Authorization', `Bearer ${access_token}`); //set header Authorization với giá trị access_token
      expect(response.statusCode).toBe(200); //so sánh http status trả ra 200 => test case pass (id đúng có thể delete product thành công)        
    })
});
