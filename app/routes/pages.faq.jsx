import {useState} from 'react';
import {Link} from '@remix-run/react';

export const meta = () => [
  {title: 'DearBook | Frequently Asked Questions'},
  {name: 'description', content: 'Find answers to common questions about DearBook guided journals — shipping, returns, product details, and more.'},
];

export default function FAQPage() {
  const categories = [
    {
      title: 'Product',
      icon: '📖',
      faqs: [
        {q: 'How many questions does the journal contain?', a: 'The journal contains over 200 carefully selected questions, organized into thoughtful categories covering childhood, family, career, love, life lessons, and more.'},
        {q: 'What is the quality of the journal?', a: 'DearBook is a premium hardcover journal with thick, 120gsm acid-free paper designed to last for decades. It features gold foil details and comes in beautiful gift-ready packaging.'},
        {q: 'What are the dimensions?', a: 'The journal measures 8 × 5.5 inches — the ideal size for comfortable writing and shelf storage.'},
        {q: 'Is this suitable for fathers of all ages?', a: "Absolutely! Whether your father is 40 or 90, the questions are designed to work for any age. Many customers have given it to grandfathers as well."},
        {q: 'Is this a good gift for someone who doesn\'t like to write?', a: "Yes! The guided format makes it easy — just answer one question at a time. Many customers report that even reluctant writers end up loving the experience."},
        {q: 'In what language is the journal?', a: 'Currently, the journal is available in English. French and Spanish editions are coming soon.'},
      ],
    },
    {
      title: 'Shipping',
      icon: '🚚',
      faqs: [
        {q: 'How long does shipping take?', a: 'We ship within 24 hours of your order. Standard delivery takes 5-8 business days to Canada and the US. Express shipping (2-3 days) is also available at checkout.'},
        {q: 'Is shipping free?', a: 'Yes! We offer free standard shipping on all orders to Canada and the United States.'},
        {q: 'Do you ship internationally?', a: 'Yes, we ship to most countries worldwide. International shipping rates and delivery times are calculated at checkout.'},
        {q: 'Can I track my order?', a: "Absolutely! You'll receive a tracking number by email as soon as your order ships. You can track your package at any time."},
      ],
    },
    {
      title: 'Returns & Guarantee',
      icon: '↩️',
      faqs: [
        {q: 'What is your return policy?', a: "We offer a 30-day money-back guarantee. If you're not satisfied for any reason, simply contact us and we'll issue a full refund — no questions asked."},
        {q: 'How do I return an item?', a: 'Simply email us at support@dearbook.ca with your order number and we\'ll provide return instructions. We cover return shipping costs.'},
        {q: 'What if my order arrives damaged?', a: 'If your journal arrives damaged, contact us immediately with photos and we\'ll send a replacement at no charge.'},
      ],
    },
    {
      title: 'Orders',
      icon: '📦',
      faqs: [
        {q: 'Can I order multiple copies?', a: 'Of course! Many customers order multiple copies for different family members. Contact us for bulk discount pricing on orders of 3 or more.'},
        {q: 'What payment methods do you accept?', a: 'We accept Visa, Mastercard, American Express, PayPal, Apple Pay, and Google Pay. All payments are processed securely.'},
        {q: 'Can I cancel or modify my order?', a: "You can cancel or modify your order within 2 hours of placing it by contacting us at support@dearbook.ca. After that, your order enters our shipping process."},
      ],
    },
  ];

  return (
    <div className="info-page">
      <div className="info-page-hero">
        <h1>Frequently Asked Questions</h1>
        <p>Everything you need to know about DearBook.</p>
      </div>

      <div className="info-page-content">
        {categories.map((cat) => (
          <section key={cat.title} className="faq-category">
            <h2 className="faq-category-title">
              <span>{cat.icon}</span> {cat.title}
            </h2>
            <div className="faq-list">
              {cat.faqs.map((faq, i) => (
                <FAQItem key={i} question={faq.q} answer={faq.a} />
              ))}
            </div>
          </section>
        ))}

        <section className="info-section info-cta-section">
          <h2>Still Have Questions?</h2>
          <p>Our team is here to help. Don't hesitate to reach out.</p>
          <Link to="/pages/contact" className="btn-primary">Contact Us →</Link>
        </section>
      </div>
    </div>
  );
}

function FAQItem({question, answer}) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item${open ? ' faq-item-open' : ''}`}>
      <button className="faq-question" onClick={() => setOpen(!open)} aria-expanded={open}>
        {question}
        <span className={`faq-chevron${open ? ' open' : ''}`}>▼</span>
      </button>
      <div className={`faq-answer${open ? ' open' : ''}`}>
        <p>{answer}</p>
      </div>
    </div>
  );
}
