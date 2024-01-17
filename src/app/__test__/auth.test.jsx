const required = require('supertest')
let access_token = '';

describe('Login tests', () => {
  const body = {
    phone: '0932323232',
    password: 'Abc@123456'
  }
  it("should call endpoint with phone & password true, return 201", async () => {
    const response = await required(`https://gce.onedev.top/api/v1/auth/sign-in`).post("").send(body);
    access_token = response._body.access_token
    expect(response.statusCode).toBe(201);
  })

  it("should call endpoint with phone & password false, return 401", async () => {
    const response = await required(`https://gce.onedev.top/api/v1/auth/sign-in`).post("").send(body);
    expect(response.statusCode).toBe(401);
  })

});


describe('Create product tests',  () => {

  const body = {
    name: "Laptop MSI Gaming Raider GE77HX 12UHS-229VN i9 12900HX/64GB/2TB/17.3UHD/Nvidia RTX 3080Ti 16GB/Win11",
    description: "Siêu máy tính MSI Gaming Raider GE77HX 12UHS-229VN đích thực là một con quái vật cấu hình với những thông số mạnh nhất có thể đi cùng một thiết kế đẹp khó cưỡng. Hãy cùng xem bộ vi xử lý Intel Core i9 12900HX và card đồ họa RTX 3080 Ti có thể mang đến những trải nghiệm đỉnh cao như thế nào.",
    images: [
      {
        name: "14",
        image_url: "https://gce.onedev.top/uploads/a838d2f3310b06ccdf24ee238bbb3b8c9.jpg",
        resource_type: "products",
        resource_id: "",
        description: ""
      }
    ],
    price: 126990000,
    amount: 88893000,
    percent_discount: 30,
    product_category_id: "a7555d82-b4d1-41d6-bb4b-76d5ed516699",
    user_id: "7cf56e74-4d72-4465-a005-7ad22fcaf229",
  }

    it("should return 200", async () => {
      const response = await required(`https://gce.onedev.top/api/v1/e-commerce/products`).post("").send(body).set('Authorization', `Bearer ${access_token}`);
      expect(response.statusCode).toBe(201);
    })
    it("should return 400", async () => {
      const response = await required(`https://gce.onedev.top/api/v1/e-commerce/products`).post("").send(body).set('Authorization', `Bearer ${access_token}`);
      expect(response.statusCode).toBe(400);
    })
});

