'use client';
import { ModalProvider } from "@/context/ModalContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { theme } from "@/shared/styles/defaultTheme";
import React from "react";
import { ThemeProvider } from "styled-components";

const queryClient = new QueryClient();

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <ModalProvider>
            {children}
          </ModalProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default Providers;
