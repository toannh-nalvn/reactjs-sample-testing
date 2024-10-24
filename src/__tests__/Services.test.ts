import { FetchData } from "../Services";

describe("FetchData", () => {
  // Clear mọi mock sau mỗi test để không ảnh hưởng đến các test khác
  afterEach(() => {
    global.fetch.mockClear();
  });

  test("should fetch data successfully", async () => {
    const mockResponse = { data: "mocked data" }; // Dữ liệu giả lập

    // Mock fetch để trả về dữ liệu giả lập
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
      })
    );

    // Gọi hàm FetchData và kiểm tra giá trị trả về
    const data = await FetchData();
    expect(data).toEqual(mockResponse);

    // Kiểm tra xem fetch có được gọi đúng với URL không
    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:3000/data.json"
    );
  });

  test("should handle fetch error", async () => {
    // Mock fetch để trả về lỗi
    global.fetch = jest.fn(() => Promise.reject(new Error("Fetch failed")));

    // Gọi hàm FetchData và kiểm tra xem lỗi có được ném ra không
    await expect(FetchData()).rejects.toThrow("Fetch failed");

    // Kiểm tra xem fetch có được gọi đúng với URL không
    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:3000/data.json"
    );
  });
});
