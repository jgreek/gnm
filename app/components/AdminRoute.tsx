// src/app/components/AdminRoute.tsx
'use client';

import { useUser } from "@clerk/nextjs";
import { redirect } from 'next/navigation';
import { Box, CircularProgress } from '@mui/material';
import { ReactNode } from 'react';

interface AdminRouteProps {
  children: ReactNode;
}

export function AdminRoute({ children }: AdminRouteProps) {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (!user?.publicMetadata?.role || user.publicMetadata.role !== 'admin') {
    redirect('/');
  }

  return <>{children}</>;
}