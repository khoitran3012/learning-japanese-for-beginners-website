/**
 * Một ngày hoạt động. `id` trùng `date` vì store IndexedDB dùng keyPath `id`.
 *
 * Tách khỏi `storage.ts` để phần cộng dồn thuần tuý này test được bằng node,
 * không cần IndexedDB.
 */
export interface DayStats {
  id: string;
  date: string;
  minutes: number;
  items: number;
  quizzes: number;
}

export interface DayDelta {
  minutes?: number;
  items?: number;
  quizzes?: number;
}

export function emptyDay(date: string): DayStats {
  return { id: date, date, minutes: 0, items: 0, quizzes: 0 };
}

function amount(v: number | undefined): number {
  return typeof v === "number" && Number.isFinite(v) && v > 0 ? v : 0;
}

/**
 * Cộng dồn `delta` vào `current` rồi trả về bản ghi mới (không sửa đầu vào).
 *
 * Dữ liệu cũ có thể thiếu trường hoặc chứa NaN sau khi nhập file sao lưu lỗi —
 * chuẩn hoá luôn ở đây để biểu đồ thống kê không bị `NaN` phút.
 */
export function applyDayDelta(current: DayStats | undefined, delta: DayDelta, date: string): DayStats {
  const base = current ?? emptyDay(date);
  return {
    ...base,
    id: date,
    date,
    minutes: amount(base.minutes) + amount(delta.minutes),
    items: amount(base.items) + amount(delta.items),
    quizzes: amount(base.quizzes) + amount(delta.quizzes),
  };
}
