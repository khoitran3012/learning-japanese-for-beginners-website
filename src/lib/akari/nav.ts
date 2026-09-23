import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  BookMarked,
  BookOpen,
  BookText,
  CircleHelp,
  Component,
  Gamepad2,
  GraduationCap,
  Headphones,
  Home,
  Languages,
  Layers,
  Library,
  Map,
  Music,
  RotateCcw,
  Search,
  Settings,
  Sparkles,
  Sprout,
  Star,
  Trophy,
  Type,
} from "lucide-react";

export interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  group: string;
}

export const NAV: NavItem[] = [
  { to: "/", label: "Trang chủ", icon: Home, group: "Chính" },
  { to: "/path", label: "Lộ trình", icon: Map, group: "Chính" },
  { to: "/daily", label: "Bài hôm nay", icon: Sparkles, group: "Chính" },
  { to: "/garden", label: "Vườn Sakura", icon: Sprout, group: "Chính" },
  { to: "/alphabet", label: "Bảng chữ cái", icon: Languages, group: "Chữ" },
  { to: "/hiragana", label: "Hiragana", icon: Type, group: "Chữ" },
  { to: "/katakana", label: "Katakana", icon: Type, group: "Chữ" },
  { to: "/kanji", label: "Kanji", icon: Library, group: "Kiến thức" },
  { to: "/radicals", label: "Bộ thủ", icon: Component, group: "Kiến thức" },
  { to: "/vocabulary", label: "Từ vựng", icon: BookOpen, group: "Kiến thức" },
  { to: "/grammar", label: "Ngữ pháp", icon: GraduationCap, group: "Kiến thức" },
  { to: "/dictionary", label: "Từ điển", icon: BookMarked, group: "Kiến thức" },
  { to: "/flashcards", label: "Thẻ từ", icon: Layers, group: "Luyện" },
  { to: "/listen", label: "Luyện nghe", icon: Headphones, group: "Luyện" },
  { to: "/songs", label: "Bài hát", icon: Music, group: "Luyện" },
  { to: "/read", label: "Luyện đọc", icon: BookText, group: "Luyện" },
  { to: "/quiz", label: "Trắc nghiệm", icon: CircleHelp, group: "Luyện" },
  { to: "/play", label: "Giải trí", icon: Gamepad2, group: "Luyện" },
  { to: "/review", label: "Ôn tập", icon: RotateCcw, group: "Luyện" },
  { to: "/leaderboard", label: "Thi đua", icon: Trophy, group: "Tôi" },
  { to: "/stats", label: "Thống kê", icon: BarChart3, group: "Tôi" },
  { to: "/favorites", label: "Yêu thích", icon: Star, group: "Tôi" },
  { to: "/my-words", label: "Từ của tôi", icon: BookMarked, group: "Tôi" },
  { to: "/settings", label: "Cài đặt", icon: Settings, group: "Tôi" },
];

export const MOBILE_TAB = [
  { to: "/", label: "Trang chủ", icon: Home },
  { to: "/daily", label: "Hôm nay", icon: Sparkles },
  { to: "/dictionary", label: "Từ điển", icon: Search },
  { to: "/garden", label: "Vườn", icon: Sprout },
  { to: "/settings", label: "Thêm", icon: Settings },
] as const;
