import { permanentRedirect } from "next/navigation";

export default function WomenPage() {
  permanentRedirect("/shop?category=women");
}
