# Akari — học tiếng Nhật từ số 0

Ứng dụng web (PWA) học tiếng Nhật cho người Việt mới bắt đầu, ưu tiên **N5 → N4**. Chạy trong trình duyệt, **local-first / offline-first**, không bắt buộc tài khoản hay máy chủ.

Luồng chính:

Tra từ → xem nghĩa → nghe → ví dụ → kanji → JLPT → thêm vào học → flashcard → quiz → spaced repetition.

## Tính năng

- Hiragana / Katakana đầy đủ, romaji, luyện viết
- Từ vựng, kanji, ngữ pháp N5–N4 (nội dung gốc)
- Từ điển Nhật–Việt: kanji, kana, romaji, tiếng Việt, gợi ý gần đúng
- Flashcard + SRS (SM-2 / Leitner)
- Quiz, luyện đọc, luyện nghe (Web Speech API, giọng ja-JP trên máy)
- Lộ trình, thống kê, yêu thích, từ của tôi
- Sao lưu / khôi phục JSON trên máy

## Dữ liệu bài học

Nằm trong `src/data/`. Tự viết, không sao chép giáo trình thương mại.

## Dictionary

### Dữ liệu lấy từ đâu

Bộ từ điển **đi kèm** được ghép từ:

1. `src/data/vocabulary-n5.ts` và `vocabulary-n4.ts` — từ vựng gốc, nghĩa tiếng Việt, câu ví dụ tự viết
2. `src/data/dictionary-extra.ts` — biểu hiện / từ katakana bổ sung
3. (Tùy chọn) mục bạn import, lưu IndexedDB store `dictionary`

**Không** dùng Google Translate, Google Dictionary, hay scraping từ điển thương mại.

### License

- Mã nguồn: MIT (`LICENSE.md`)
- Dữ liệu đi kèm: nội dung gốc, phát hành cùng MIT
- Import thêm: **bạn** chịu trách nhiệm giấy phép file JSON mang vào (ví dụ JMdict là CC-BY-SA — nếu import, tuân thủ copyleft của nguồn đó; Akari không đóng gói JMdict)

### Cách cập nhật

Sửa file TypeScript trong `src/data/` (`vocabulary-n5.ts`, `vocabulary-n4.ts`, `dictionary-extra.ts`, `dictionary-core.ts`), hoặc import JSON qua **Cài đặt → Import / kiểm tra từ điển**.

Tra cứu bổ sung (Grok) khi không có kết quả local: nút **Tra cứu bổ sung** trên trang từ điển, hoặc bật *Tự tra cứu bổ sung* trong Cài đặt. Kết quả xem trước rồi mới lưu IndexedDB.

Tìm kiếm nhận: kanji, kana, romaji (kể cả thiếu dấu dài / sokuon), nghĩa Việt có/không dấu, và dạng ます / て / ない.

### Cách import dictionary

1. Mở `/tools/import-dictionary`
2. Dán JSON dạng `{ "entries": [ ... ] }` hoặc mảng
3. **Kiểm tra** — bắt duplicate, JSON lỗi, thiếu kana, JLPT/POS sai, thiếu nghĩa
4. **Lưu vào IndexedDB** — trộn với bộ đi kèm khi tra cứu
5. **Chạy acceptance** — `学校`, `がっこう`, `gakkou`, `trường học`, `食べる`, `gakko`

Trường tối thiểu của một mục:

```json
{
  "kanji": "学校",
  "kana": "がっこう",
  "romaji": "gakkou",
  "meanings": ["trường học"],
  "part_of_speech": ["danh từ"],
  "jlpt": ["N5"]
}
```

Mẫu: `public/data/dictionary.sample.json`

### Cách build search index

Index được tạo lúc import (`src/lib/dictionary/import.ts` → `buildSearchIndex`):

- khóa: kanji, kana, romaji (kể cả biến thể `ou`/`o`), nghĩa, tag
- giá trị: danh sách id

Tra cứu runtime dùng `searchLocal` (exact + prefix + fuzzy / Levenshtein), không cần mạng.

Xuất toàn bộ catalog: nút **Xuất dictionary.json** trên trang import.

## Lưu trữ

- IndexedDB `akari-nihongo`: SRS, yêu thích, từ của tôi, quiz, lịch sử tra, thống kê ngày, từ điển import
- localStorage `akari-settings`: giao diện và tùy chọn học

Sao lưu trong **Cài đặt**.

## Chạy trên máy (Windows)

Double-click `start-akari.bat`. File tự:

1. Tìm **Node.js** và **npm** (PATH, nvm-windows, `Program Files\nodejs`, Scoop, Volta, Chocolatey, fnm)
2. Bỏ qua giả Node của Microsoft Store
3. `npm install` lần đầu nếu chưa có thư viện
4. Khởi chạy Akari

Nếu cửa sổ báo `'set' is not recognized` / `package.json not found`: dùng đúng file `start-akari.bat` mới trong thư mục project (không copy nội dung vào Notepad rồi lưu Unicode).

Chưa có Node? Cài bản **22 LTS** tại [nodejs.org](https://nodejs.org) (file `.msi`, giữ mục Add to PATH), rồi bấm lại `start-akari.bat` — không cần restart máy. Tránh Node 24 nếu PGLite báo lỗi khởi tạo.

Khi hiện sẵn sàng, mở địa chỉ trong `akari-host.json` (mặc định http://khoitran3012.ddns.net:8080 hoặc http://localhost:8080).

### Lỗi `PGlite failed to initialize properly`

PGLite (Postgres nhúng) hay hỏng trên Windows khi:

- Node 24 (WASM) — dùng **Node 22 LTS**
- Thư mục `data\pglite` bị dở dang từ lần chạy trước

Cách xử lý:

1. Đóng cửa sổ npm, xóa hẳn thư mục `data\pglite` (và `data\pglite.broken-*` nếu có)
2. Cài [Node 22 LTS](https://nodejs.org) rồi chạy lại `start-akari.bat`
3. App tự thử lại: đĩa → thư mục mới → in-memory, **không còn tắt cả web** nếu SQL lỗi
4. Muốn bỏ qua đĩa: trong `akari-host.json` thêm `"pgliteMemory": true` (tài khoản mất khi tắt máy)
5. Hoặc cài Postgres và điền `databaseUrl` (mục Database SQL bên dưới)


## Host trên khoitran3012.ddns.net (sửa lỗi đăng nhập)

App tự chấp nhận origin cùng domain và đổi cookie sang dạng HTTP (không cần `__Host-` / Secure) khi bạn mở bằng `http://khoitran3012.ddns.net`.

Vẫn nên chạy `start-akari.bat` để:

1. Khớp `publicOrigin` trong `akari-host.json` với địa chỉ bạn mở (kèm cổng `:8080` nếu có)
2. Lưu tài khoản bằng SQL (file `data/pglite` hoặc Postgres trong `databaseUrl`)

Trên domain riêng, dùng **email + mật khẩu**. Google / X chỉ trên bản Grok. Cho phép cookie trên trình duyệt.

Có HTTPS thì đổi `publicOrigin` sang `https://...`.

## Database SQL

Mặc định khi self-host: **PostgreSQL nhúng (PGLite)** lưu tại `data/pglite` — tài khoản và bảng xếp hạng còn sau khi tắt máy.

Muốn Postgres riêng:

1. Cài PostgreSQL, tạo database `akari`, hoặc `docker compose -f docker-compose.akari.yml up -d`
2. Trong `akari-host.json`:

```json
{
  "publicOrigin": "http://khoitran3012.ddns.net:8080",
  "databaseUrl": "postgres://akari:akari@127.0.0.1:5432/akari"
}
```

3. Chạy lại `start-akari.bat` — schema (`migrations/*.sql`) tự apply.

Không tạo file `.env`. Mọi cấu hình host nằm trong `akari-host.json`.

## Phát âm

Mặc định Web Speech API (`ja-JP`). Nếu máy chưa có giọng Nhật, app vẫn học được — chỉ không đọc.

## Kiến trúc

```
src/data/          bài học + từ điển gốc
src/lib/akari/     SRS, IndexedDB, TTS, cài đặt
src/lib/dictionary tìm kiếm, import, catalog
src/lib/api/       DataProvider local-first (API tùy chọn)
src/routes/_app/   trang học
```
