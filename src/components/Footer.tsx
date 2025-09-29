import { FOOTER_HEIGHT } from "@/constants/constant";

export default function Footer() {
  console.log(FOOTER_HEIGHT);
  return (
    <footer
      className={`border-t bg-gray-100 text-center flex items-center justify-center h-[var(--footer-height)] text-sm text-gray-500`}
    >
      © 2025 Keyword Genius — Internal Use Only
    </footer>
  );
}
