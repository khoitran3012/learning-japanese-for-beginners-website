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

Cần [Node.js LTS](https://nodejs.org) (có kèm npm).

1. Giải nén / mở thư mục project
2. Double-click `start-akari.bat` (hoặc trong PowerShell: `.\start-akari.bat`)
3. Lần đầu sẽ tự `npm install` (vài phút). Khi hiện sẵn sàng, mở [http://localhost:8080](http://localhost:8080)

Lệnh tay:

```bat
cd /d F:\learning-japanese-for-beginners-website
npm install
npm run dev
```

Lỗi `spawn vite ENOENT` = chưa cài thư viện, hoặc Windows không tìm thấy Vite. File `start-akari.bat` mới sẽ `npm install` giúp bạn; `npm run dev` chạy Vite qua Node nên không còn phụ thuộc `vite.cmd`.

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
