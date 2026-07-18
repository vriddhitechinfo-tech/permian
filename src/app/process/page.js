import ProcessTimeline from '@/app/components/Process/ProcessTimeline';

export const metadata = {
  title: 'Our Concrete Process | Permian Concrete',
  description: 'Step-by-step concrete pour protocol by Alonso Cardenas in Midland-Odessa, TX.',
};

export default function ProcessPage() {
  return (
    <main>
      <ProcessTimeline />
    </main>
  );
}