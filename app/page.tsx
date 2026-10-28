import { DownloadPage } from "./download-page";
import { Newsletter } from "./newsletter";
import { app, faqs, footerLinks } from "@/lib/release";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

function FaqColumn({ items }: { items: typeof faqs }) {
  return (
    <Accordion type="multiple" className="gap-2">
      {items.map((f) => (
        <AccordionItem key={f.q} value={f.q} className="rounded-lg border-none px-3 data-open:bg-secondary">
          <AccordionTrigger className="min-h-11 text-base text-foreground hover:no-underline">{f.q}</AccordionTrigger>
          <AccordionContent className="text-base text-foreground-2">{f.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default function Page() {
  const half = Math.ceil(faqs.length / 2);

  return (
    <>
      <main>
        <DownloadPage />

        <section className="page-container grid gap-8 pt-16 pb-8" id="faq" aria-labelledby="faq-h">
          <h2 id="faq-h" className="text-section">
            FAQ
          </h2>
          <div className="grid items-start gap-x-16 md:grid-cols-2">
            <FaqColumn items={faqs.slice(0, half)} />
            <FaqColumn items={faqs.slice(half)} />
          </div>
          <p>
            Find more answers to your questions in the{" "}
            <a className="text-foreground underline decoration-input underline-offset-4 hover:decoration-foreground" href="#">
              documentation
            </a>
            .
          </p>
        </section>
      </main>

      <footer className="page-container grid gap-8 pt-16 pb-24 md:grid-cols-2 md:gap-16">
        <div className="grid min-w-0 content-start gap-8" id="news">
          <h2 className="max-w-[16ch] text-title">Tell me about new {app.name} features as they come out</h2>
          <Newsletter />
        </div>
        <nav className="grid content-start gap-2" aria-label="Resources">
          <h3 className="text-base tracking-normal">Resources</h3>
          <ul className="grid gap-x-5 sm:grid-cols-2">
            {footerLinks.map((l) => (
              <li key={l.label}>
                <a className="inline-flex min-h-11 items-center text-foreground hover:underline" href={l.href}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </footer>
    </>
  );
}
