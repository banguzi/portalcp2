import { createFileRoute } from "@tanstack/react-router";
import { CpPortal } from "@/components/cp-portal";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <CpPortal />;
}
