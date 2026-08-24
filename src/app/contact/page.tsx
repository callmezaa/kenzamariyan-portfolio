import type { Metadata } from "next";
import ContactPage from "@/app/components/contact-page/ContactPage";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Ken Zamariyan — project inquiries, roles, and collaborations. Email, WhatsApp, LinkedIn, or the contact form — replies within 24 hours.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactRoute() {
  return <ContactPage />;
}
