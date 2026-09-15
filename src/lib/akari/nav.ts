import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  BookMarked,
  BookOpen,
  BookText,
  CircleHelp,
  GraduationCap,
  Headphones,
  Home,
  Languages,
  Layers,
  Library,
  Map,
  PenTool,
  RotateCcw,
  Search,
  Settings,
  Star,
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
  { to: "/alphabet", label: "Bảng chữ cái", icon: Languages, group: "Chữ" },
  { to: "/hiragana", label: "Hiragana", icon: Type, group: "Chữ" },
  { to: "/katakana", label: "Katakana", icon: Type, group: "Chữ" },
  { to: "/romaji", label: "Romaji", icon: PenTool, group: "Chữ" },
  { to: "/kanji", label: "Kanji", icon: Library, group: "Kiến thức" },
  { to: "/vocabulary", label: "Từ vựng", icon: BookOpen, group: "Kiến thức" },
  { to: "/grammar", label: "Ngữ pháp", icon: GraduationCap, group: "Kiến thức" },
  { to: "/dictionary", label: "Từ điển", icon: BookMarked, group: "Kiến thức" },
  { to: "/flashcards", label: "Flashcard", icon: Layers, group: "Luyện" },
  { to: "/listen", label: "Luyện nghe", icon: Headphones, group: "Luyện" },
  { to: "/read", label: "Luyện đọc", icon: BookText, group: "Luyện" },
  { to: "/quiz", label: "Quiz", icon: CircleHelp, group: "Luyện" },
  { to: "/review", label: "Ôn tập", icon: RotateCcw, group: "Luyện" },
  { to: "/stats", label: "Thống kê", icon: BarChart3, group: "Tôi" },
  { to: "/favorites", label: "Yêu thích", icon: Star, group: "Tôi" },
  { to: "/my-words", label: "Từ của tôi", icon: BookMarked, group: "Tôi" },
  { to: "/settings", label: "Cài đặt", icon: Settings, group: "Tôi" },
];

export const MOBILE_TAB = [
  { to: "/", label: "Home", icon: Home },
  { to: "/path", label: "Lộ trình", icon: Map },
  { to: "/dictionary", label: "Từ điển", icon: Search },
  { to: "/review", label: "Ôn", icon: RotateCcw },
  { to: "/settings", label: "Thêm", icon: Settings },
] as const;
