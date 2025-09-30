import { Outlet, createRootRoute } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import React from "react";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <Navbar />
      <main className="max-h-[var(--main-height)] h-[var(--main-height)] overflow-y-scroll bg-slate-50">
        <Outlet />
      </main>
      <Footer />
    </React.Fragment>
  );
}
