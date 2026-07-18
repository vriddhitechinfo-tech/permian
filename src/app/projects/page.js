import Projects from '@/app/components/Projects/Projects';
import ProjectsExtendedGSAP from '@/app/components/Projects/ProjectsExtendedGSAP';

export const metadata = {
  title: 'Our Concrete Projects | Permian Concrete',
  description: 'Explore completed residential driveways and commercial slabs in West Texas.',
};

export default function ProjectsPage() {
  return (
    <main style={{ paddingTop: '80px' }}>
      <Projects />
      <ProjectsExtendedGSAP />
    </main>
  );
}
