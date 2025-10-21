import Container from "@/components/Container";
import siteData from "@/data/site.json";
import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: `Contact • ${siteData.site.name}`,
  description: "Get in touch with us",
};

export default function ContactPage() {
  const contact = siteData.contact;

  return (
    <Container>
      <section className="py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <h1 className="text-3xl font-bold">Contact</h1>
          <dl className="mt-4 space-y-2 text-gray-700">
            <div>
              <dt className="font-medium inline">Email: </dt>
              <dd className="inline">{contact.email}</dd>
            </div>
            <div>
              <dt className="font-medium inline">Location: </dt>
              <dd className="inline">{contact.location}</dd>
            </div>
          </dl>
          <p className="mt-4 text-gray-600">{contact.note}</p>
        </div>

        <div>
          <ContactForm />
        </div>
      </section>
    </Container>
  );
}
