import { createServerFn } from "@tanstack/react-start";

export type DbInfo = {
  engine: "postgres" | "pglite";
  persistent: boolean;
  label: string;
};

export const getDbInfo = createServerFn({ method: "GET" }).handler(async (): Promise<DbInfo> => {
  const url = process.env.DATABASE_URL?.trim();
  if (url) {
    return {
      engine: "postgres",
      persistent: true,
      label: "PostgreSQL (SQL)",
    };
  }
  const dir = process.env.AKARI_PGLITE_DIR?.trim();
  if (dir) {
    return {
      engine: "pglite",
      persistent: true,
      label: "PostgreSQL nhúng (SQL, lưu file)",
    };
  }
  return {
    engine: "pglite",
    persistent: false,
    label: "PostgreSQL nhúng (SQL, bộ nhớ — mất khi tắt máy chủ)",
  };
});
