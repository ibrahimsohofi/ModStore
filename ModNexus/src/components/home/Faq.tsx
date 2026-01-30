import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    id: "item-1",
    question: "Are these games safe to download?",
    answer:
      "Absolutely! All games on our platform are verified for safety and performance. We've helped over 100,000 mobile gamers download their favorite games without issues.",
  },
  {
    id: "item-2",
    question: "Why do I need to complete verification?",
    answer:
      "The quick verification helps us prevent bots and ensure our gaming platform remains sustainable. This simple step supports our servers and allows us to keep providing high-quality mobile games.",
  },
  {
    id: "item-3",
    question: "How long until I can play my game?",
    answer:
      "Games are available to download immediately after verification. The download speed will depend on your internet connection, but most games are ready to play within minutes.",
  },
  {
    id: "item-4",
    question: "Do the games include all features?",
    answer:
      "Yes! All games on our platform include all standard features and functionalities. Our games are regularly updated to ensure compatibility with the latest mobile OS versions.",
  },
  {
    id: "item-5",
    question: "Do you support all mobile devices?",
    answer:
      "Our games are compatible with both Android and iOS devices. Each game listing specifies the minimum system requirements to ensure optimal performance on your device.",
  },
  {
    id: "item-6",
    question: "How often are the games updated?",
    answer:
      "We update our games regularly to match official releases, ensuring you always have access to the latest versions with all current features and improvements.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="py-16">
      <div className="container-custom">
        <h2 className="section-title">
          FREQUENTLY <span className="highlight">ASKED QUESTIONS</span>
        </h2>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="border-b border-[#00f7ff]/20"
              >
                <AccordionTrigger className="text-xl font-bold text-[#00f7ff] hover:text-[#00c4cc] hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
