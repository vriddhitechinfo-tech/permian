import Services from '@/app/components/Services/Services';
import ServicesExtendedGSAP from '@/app/components/Services/ServicesExtendedGSAP';

export const metadata = {
  title: 'Our Concrete Services | Permian Concrete',
  description: 'Residential & commercial concrete services in Midland-Odessa, TX.',
};

export default function ServicesPage() {
  return (
    <main style={{ paddingTop: '80px' }}>
      <Services />
      <ServicesExtendedGSAP />
    </main>
  );
}