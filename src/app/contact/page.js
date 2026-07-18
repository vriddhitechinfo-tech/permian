import Contact from '@/app/components/Contact/Contact';

export const metadata = {
  title: 'Contact Us | Permian Concrete',
  description: 'Get in touch with Alonso Cardenas for a free concrete estimate in Midland-Odessa.',
};

export default function ContactPage() {
  return (
    <main style={{ paddingTop: '80px' }}>
      <Contact />
    </main>
  );
}
