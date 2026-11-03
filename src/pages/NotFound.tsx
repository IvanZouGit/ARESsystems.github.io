import { Link } from 'react-router-dom';
import { SectionShell, Label } from '../lib/ui';
import { useDocumentTitle } from '../lib/useDocumentTitle';

export default function NotFound() {
  useDocumentTitle('Page not found');
  return (
    <SectionShell className="pt-40">
      <Label>404</Label>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-bone">Page not found.</h1>
      <p className="mt-4 text-mist">That page does not exist.</p>
      <Link to="/" className="mt-8 inline-block bg-signal px-6 py-3.5 text-sm font-medium text-bone hover:bg-signal-bright">
        Back to home
      </Link>
    </SectionShell>
  );
}
