# Akari — học tiếng Nhật online miễn phí (N5, N4)

Ứng dụng web học tiếng Nhật miễn phí cho người mới: hiragana, katakana, kanji, từ vựng, ngữ pháp, luyện nghe và từ điển Nhật–Việt. Lộ trình chính là JLPT N5 đến N4. Mã nguồn mở MIT. Build trên Grok.

## Mục lục

- [Học tiếng Nhật N5–N4](#học-tiếng-nhật-n5n4)
- [Từ điển Nhật Việt](#từ-điển-nhật-việt)
- [Miễn phí, không thu phí](#miễn-phí-không-thu-phí)
- [Mã nguồn mở MIT](#mã-nguồn-mở-mit)
- [Câu hỏi thường gặp](#câu-hỏi-thường-gặp)
- [Chạy trên máy](#chạy-trên-máy)

## Học tiếng Nhật N5–N4

Akari dành cho người bắt đầu học tiếng Nhật từ số 0, theo thứ tự người Việt hay học: bảng chữ, từ, kanji, rồi nghe nói.

- Lộ trình học JLPT N5 và N4
- Hiragana và katakana, có đánh dấu chữ đã nhớ
- Kanji kèm Hán-Việt, âm on, âm kun và thứ tự nét
- Bộ thủ, cách nhớ chữ cho người mới
- Từ vựng, ngữ pháp, luyện nghe, luyện đọc
- Bài mỗi ngày: kanji mới, từ mới, bài kiểm tra
- Thẻ ôn và vườn Sakura (tiến độ lưu trên trình duyệt)

Kanji N3–N1 vẫn tra cứu được. Phần học có lộ trình tập trung N5–N4.

## Từ điển Nhật Việt

Có từ điển Nhật–Việt để tra khi học, không cần rời trang.

Tra bằng kanji, hiragana, katakana, romaji hoặc tiếng Việt. Mỗi mục có cách đọc, nghĩa và ví dụ khi dữ liệu có sẵn. Bộ từ đi kèm lấy từ từ vựng N5–N4 trong `src/data/`. Có thể nhập thêm JSON tại `/tools/import-dictionary`.

## Miễn phí, không thu phí

Bản chính thức miễn phí toàn bộ: bài học, từ điển và AI. Không bán khóa học, không khóa tính năng, không thu phí.

Nếu ai thu tiền để dùng Akari, bán lại bản này, gắn tường phí, hoặc thu phí phần AI: báo tác giả **Khoi Tran**, kèm đường dẫn, ảnh và cách họ thu tiền. Tác giả sẽ yêu cầu gỡ và kiện khi đủ căn cứ (mạo danh hoặc lừa thu phí trên phần mềm miễn phí).

## Mã nguồn mở MIT

Giấy phép: [MIT](LICENSE.md). Copyright (c) 2026 Akari.

Được xem, sửa và chia sẻ mã nguồn. Phải giữ dòng giấy phép. Không được xóa thông báo miễn phí rồi bán như sản phẩm thu phí chính thức của Akari.

Bài học trong `src/data/` là nội dung gốc, cùng giấy phép MIT. Không sao chép giáo trình thương mại và không đóng gói JMdict. File từ điển bạn tự nhập thì bạn tự chịu giấy phép của nguồn đó.

## Câu hỏi thường gặp

### Học tiếng Nhật online trên Akari có mất phí không?

Không. Ứng dụng, từ điển và AI đều miễn phí.

### Akari dạy tới trình độ nào?

Lộ trình học chính là N5 và N4. Từ điển và kanji cao hơn dùng để tra cứu.

### Có từ điển Nhật Việt không?

Có. Tra kanji, kana, romaji và nghĩa tiếng Việt ngay trong ứng dụng.

### Akari được làm bằng gì?

Build trên Grok. Chạy trên trình duyệt. Tiến độ học lưu trên máy bạn.

### Ai thu phí thì báo ở đâu?

Báo Khoi Tran kèm link và ảnh chụp để yêu cầu gỡ và kiện nếu đủ căn cứ.

## Chạy trên máy

Cần Node.js 22 LTS. Trên Windows, mở `start-akari.bat`, rồi vào địa chỉ máy in ra (thường là `http://localhost:8080`).

Muốn mở cho nhiều người, tự dùng tên miền công cộng và ghi vào `akari-host.json`:

```json
{
  "publicOrigin": "http://localhost:8080"
}
```

Đổi `publicOrigin` thành đúng địa chỉ người học mở, kể cả cổng. Có HTTPS thì dùng `https://`.

Nếu báo `PGlite failed to initialize`: dùng Node 22, xóa thư mục `data/pglite`, chạy lại. Lỗi SQL thì ứng dụng vẫn mở ở chế độ bộ nhớ.

Tiến độ nằm trong IndexedDB. Cài đặt nằm trong localStorage. Sao lưu ở mục **Cài đặt**. Giọng đọc dùng tiếng Nhật của trình duyệt (`ja-JP`). Máy không có giọng đó vẫn học được, chỉ không nghe được.
