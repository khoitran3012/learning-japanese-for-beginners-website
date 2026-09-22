import { Card, CardContent } from "@/components/ui/card";
import { SpeakButton } from "@/components/speak-button";

const SOUND_ROWS: Array<{ label: string; jp: string; speak: string; note: string }> = [
  { label: "Nguyên âm", jp: "あ い う え お", speak: "あいうえお", note: "Năm khuôn miệng. Mọi âm khác chỉ thêm phụ âm vào đây." },
  { label: "Mora (nhịp)", jp: "がっこう", speak: "がっこう", note: "ga-っ-ko-u = 4 nhịp. きゃ, っ, ー, ん mỗi cái một nhịp." },
  { label: "Dakuten", jp: "か→が  さ→ざ  た→だ", speak: "かが さざ ただ", note: "Hai chấm đổi thanh: k→g, s→z, t→d, h→b." },
  { label: "Yōon", jp: "きゃ しゅ ちょ", speak: "きゃ しゅ ちょ", note: "Ký tự nhỏ ゃゅょ: một nhịp, không tách き+や." },
];

export function KanjiLearnGuide() {
  return (
    <div className="mb-6 grid gap-3 lg:grid-cols-2">
      <Card>
        <CardContent className="space-y-3 py-5">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-subtle">音韻</p>
          <h2 className="font-medium text-fg">Hệ thống âm tiếng Nhật</h2>
          <p className="text-sm leading-relaxed text-muted">
            Tiếng Nhật đọc theo <span className="text-fg">mora</span>, không theo âm tiết tiếng Việt. Kanji không có
            “một âm cố định”: chữ mượn âm Hán (<span className="text-fg">on</span>) hoặc âm Nhật (
            <span className="text-fg">kun</span>). Từ điển ghi on bằng katakana, kun bằng hiragana.
          </p>
          <ul className="space-y-2">
            {SOUND_ROWS.map((r) => (
              <li key={r.label} className="rounded-[10px] border border-border bg-bg-elevated px-3 py-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-xs text-subtle">{r.label}</p>
                    <p className="font-jp text-base text-fg">{r.jp}</p>
                    <p className="text-xs text-muted">{r.note}</p>
                  </div>
                  <SpeakButton text={r.speak} kana={r.speak} label="Nghe" />
                </div>
              </li>
            ))}
          </ul>
          <p className="text-xs leading-relaxed text-muted">
            On gần Hán-Việt (学 ガク ~ Học, 校 コウ ~ Hiệu) nên người Việt nhớ nghĩa trước. Kun là cách người Nhật gọi đồ
            vật: 山 やま, 人 ひと. Trong từ ghép thường đọc on; chữ một mình hoặc có đuôi hiragana thường đọc kun.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-3 py-5">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-subtle">記憶</p>
          <h2 className="font-medium text-fg">Cách nhớ kanji hiệu quả</h2>
          <ol className="space-y-2.5 text-sm leading-relaxed text-muted">
            <li>
              <span className="font-medium text-fg">1. Hán-Việt trước âm Nhật.</span> Nhìn 水 nghĩ Thủy / nước, rồi mới
              gắn みず (kun) và スイ (on).
            </li>
            <li>
              <span className="font-medium text-fg">2. Bộ thủ là mảnh nghĩa.</span> 氵 = nước → 海 池 河. Học bộ rồi ghép
              chuyện: “ba giọt + mỗi = biển”.
            </li>
            <li>
              <span className="font-medium text-fg">3. Học trong từ, không học chữ trần.</span> 食 nhớ kèm 食堂 (しょくどう,
              on) và 食べる (たべる, kun + đuôi).
            </li>
            <li>
              <span className="font-medium text-fg">4. Viết đúng nét, nói hiragana.</span> Tay nhớ hình, miệng nhớ ひ /
              にち — máy đọc kana, không đọc thẳng chữ Hán.
            </li>
            <li>
              <span className="font-medium text-fg">5. Ôn ngắt quãng.</span> Vào ô chữ, lật nghĩa, đánh “đã nhớ”. Chữ
              khó quay lại sau 1 ngày, 3 ngày.
            </li>
            <li>
              <span className="font-medium text-fg">6. Cụm âm on giống nhau.</span> 生 せい, 正 せい, 西 せい — họ âm
              gần; gắn Hán-Việt Sinh / Chính / Tây để khỏi lẫn nghĩa.
            </li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
