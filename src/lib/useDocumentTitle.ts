import { useEffect } from 'react';

export function useDocumentTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} | ARES Systems` : 'ARES Systems | Autonomous Robotics for Emergency Response';
  }, [title]);
}
