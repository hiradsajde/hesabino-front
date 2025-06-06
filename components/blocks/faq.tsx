import FeatureCard from "@/app/(landing)/components/FeatureCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Mail, Phone } from "lucide-react";
import * as variants from "@/lib/motionVariants" 
import { motion } from "motion/react"
import { buttonVariants } from "../ui/fuma-button";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface Faq3Props {
  heading: string;
  description: string;
  items?: FaqItem[];
  supportHeading: string;
  supportDescription: string;
  supportButtonText: string;
  supportButtonUrl: string;
}

const faqItems = [
  {
    id: "faq-1",
    question: "What is the return policy?",
    answer:
      "You can return any item within 30 days of purchase for a full refund, provided it is in its original condition.",
  },
  {
    id: "faq-2",
    question: "How do I track my order?",
    answer:
      "Once your order is shipped, you will receive an email with a tracking number. You can use this number on our website to track your order.",
  },
  {
    id: "faq-3",
    question: "Do you offer international shipping?",
    answer:
      "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary depending on the destination.",
  },
  {
    id: "faq-4",
    question: "Can I change my order after it has been placed?",
    answer:
      "You can change your order within 24 hours of placing it by contacting our customer service team.",
  },
  {
    id: "faq-5",
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and Apple Pay.",
  },
  {
    id: "faq-6",
    question: "How can I contact customer support?",
    answer:
      "You can reach our customer support team via email at support@example.com or by calling 1-800-123-4567.",
  },
  {
    id: "faq-7",
    question: "Are there any discounts for bulk purchases?",
    answer:
      "Yes, we offer discounts for bulk purchases. Please contact our sales team for more information.",
  },
];

const Faq = ({
  heading = "Frequently asked questions",
  description = "Find answers to common questions about our products. Can't find what you're looking for? Contact our support team.",
  items = faqItems,
  supportHeading = "Need more support?",
  supportDescription = "Our dedicated support team is here to help you with any questions or concerns. Get in touch with us for personalized assistance.",
  supportButtonText = "Contact Support",
  supportButtonUrl = "https://www.shadcnblocks.com",
}: Faq3Props) => {
  return (
    <section className="md:py-32">
      <div className="container space-y-16">
        <div className="mx-auto flex max-w-3xl flex-col text-right md:text-center">
          <h2 className="mb-3 text-3xl font-semibold md:mb-4 lg:mb-6 lg:text-4xl text-center lg:text-right">
            {heading}
          </h2>
          <p className="text-muted-foreground lg:text-lg text-center lg:text-right">{description}</p>
        </div>
        <Accordion
          type="single"
          collapsible
          className="mx-auto w-full lg:max-w-3xl"
        >
          {items.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger className="transition-opacity duration-200 hover:no-underline hover:opacity-60">
                <div className="font-medium sm:py-1 lg:py-2 lg:text-lg text-right">
                  {item.question}
                </div>
              </AccordionTrigger>
              <AccordionContent className="sm:mb-1 lg:mb-2">
                <div className="text-muted-foreground lg:text-lg text-justify">
                  {item.answer}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="grid md:grid-cols-2 gap-8 justify-center items-center">
                        <FeatureCard classes="w-fit h-fit mx-auto">
                          <>
                            <div className='p-5 gap-2 flex items-center justify-center'>
                              <div>
                              <motion.div 
                                variants={variants.fadeInUp}
                                className={`w-8 h-8 grid place-items-center rounded-full flex-shrink-0`}
                              >
                                <Phone/>
                              </motion.div>
                              </div>
                              <motion.div variants={variants.fadeInUp} className="flex flex-col gap-2">
                                <a
                                  className={buttonVariants({
                                    color: "outline",
                                    className: "flex items-center justify-center p-2"
                                  })}
                                >
                                  021-77807533
                                </a>
                                <a
                                  href="tel:02177807533"
                                  className={buttonVariants({
                                    color: "secondary", 
                                    className: "hover:cursor-pointer"
                                  })}
                                >گفت‌وگو با کارشناس</a>
                              </motion.div>
                            </div>
                          </>
                        </FeatureCard>
                        <FeatureCard classes="w-fit h-fit">
                          <>
                            <div className='p-5 gap-2 flex items-center justify-center'>
                              <div>
                              <motion.div 
                                variants={variants.fadeInUp}
                                className={`w-8 h-8 grid place-items-center rounded-full flex-shrink-0`}
                              >
                                <Mail/>
                              </motion.div>
                              </div>
                              <motion.div variants={variants.fadeInUp} className="flex flex-col gap-2">
                                <a
                                  className={buttonVariants({
                                    color: "outline",
                                    className: "flex items-center justify-center p-2"
                                  })}
                                >
                                  hi@hiradsajde.ir
                                </a>
                                <a
                                  href="tel:02177807533"
                                  className={buttonVariants({
                                    color: "secondary", 
                                    className: "hover:cursor-pointer"
                                  })}
                                >تماس از طریق ایمیل</a>
                              </motion.div>
                            </div>
                          </>
                        </FeatureCard>

        </div>
      </div>
    </section>
  );
};

export { Faq };
