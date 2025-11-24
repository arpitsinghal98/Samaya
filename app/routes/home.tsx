import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Samaya - Scheduling, Simplified" },
    { name: "description", content: "Professional scheduling for modern professionals." },
  ];
}

export default function Home() {
  return <Welcome />;
}
