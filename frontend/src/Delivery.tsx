import { useState } from 'react';
import { Truck, Package, Shield, Clock, ChevronDown } from 'lucide-react';
import Navigation from './components/user/Navigation';

interface FAQItem {
  question: string;
  answer: string;
}

export default function Delivery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const features = [
    {
      icon: <Clock className="w-12 h-12 text-indigo-400" />,
      title: "24h Delivery",
      description: "Fast delivery within 24 hours for orders placed before 2 PM"
    },
    {
      icon: <Package className="w-12 h-12 text-indigo-400" />,
      title: "Order Tracking",
      description: "Track your package in real-time from warehouse to your door"
    },
    {
      icon: <Truck className="w-12 h-12 text-indigo-400" />,
      title: "Free Shipping",
      description: "Free delivery on all orders over $50"
    },
    {
      icon: <Shield className="w-12 h-12 text-indigo-400" />,
      title: "Safe Packaging",
      description: "Your products are carefully packed to ensure safe delivery"
    }
  ];

  const faqs: FAQItem[] = [
    {
      question: "How long does delivery take?",
      answer: "Standard delivery takes 24-48 hours for domestic orders. Express delivery is available within 24 hours for orders placed before 2 PM."
    },
    {
      question: "Can I track my order?",
      answer: "Yes! Once your order ships, you'll receive a tracking number via email. You can track your package in real-time on our website or through the courier's tracking system."
    },
    {
      question: "What are the shipping costs?",
      answer: "Shipping costs vary by location and order weight. However, we offer FREE shipping on all orders over $50. Express delivery has an additional fee of $10."
    },
    {
      question: "Do you deliver internationally?",
      answer: "Currently, we only deliver within the country. International shipping will be available soon. Sign up for our newsletter to stay updated!"
    },
    {
      question: "What if I'm not home during delivery?",
      answer: "Our courier will attempt delivery up to 3 times. If you're not available, they'll leave a notice with instructions for package pickup at the nearest location or to reschedule delivery."
    },
    {
      question: "Can I change my delivery address after placing an order?",
      answer: "Yes, but only if your order hasn't been shipped yet. Contact our customer service immediately at support@pixelshop.com or call us at +381 11 123 4567."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-neutral-900">
      {/* Hero Section */}
      <Navigation/>
      <section className="relative bg-neutral-800 py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Fast & Reliable Delivery
            </h1>
            <p className="text-xl text-neutral-400 max-w-3xl mx-auto">
              Get your products delivered quickly and safely. We ensure your orders arrive on time, every time.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-neutral-900 p-8 rounded-xl border border-neutral-700 hover:border-indigo-500 transition-all duration-300"
              >
                <div className="flex justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white text-center mb-4">
                  {feature.title}
                </h3>
                <p className="text-neutral-400 text-center leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-neutral-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-neutral-400 text-lg">
              Find answers to common questions about our delivery service
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-neutral-800 rounded-xl border border-neutral-700 overflow-hidden hover:border-indigo-500/50 transition-all duration-300"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left group"
                >
                  <span className="text-lg font-semibold text-white pr-8 group-hover:text-indigo-400 transition-colors duration-300">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-6 h-6 text-indigo-400 flex-shrink-0 transition-transform duration-300 ${
                      openIndex === index ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    openIndex === index
                      ? 'max-h-96 opacity-100'
                      : 'max-h-0 opacity-0'
                  } overflow-hidden`}
                >
                  <div className="px-8 pb-6 pt-0">
                    <p className="text-neutral-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-16 text-center bg-neutral-800 p-12 rounded-xl border border-neutral-700">
            <h3 className="text-3xl font-bold text-white mb-4">
              Still have questions?
            </h3>
            <p className="text-neutral-400 text-lg mb-8">
              Our customer support team is here to help you
            </p>
            <a
              href="/contact"
              className="inline-block bg-indigo-600 text-white px-10 py-4 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition-colors duration-300 shadow-lg shadow-indigo-500/20"
            >
              Contact Support
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}