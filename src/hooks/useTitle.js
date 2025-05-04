import { useEffect } from 'react';

export const useTitle = (title) => {
    useEffect(() => {
        document.title = `${title} - Write Node`;
    }, [title]);

  return null;
}
