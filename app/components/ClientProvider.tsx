'use client';

import { Box } from '@mui/material';
import { useEffect, useState } from 'react';

export default function ClientProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // or a loading spinner if you prefer
  }

  return <Box>{children}</Box>;
}