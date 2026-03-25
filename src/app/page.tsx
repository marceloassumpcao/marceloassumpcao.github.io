"use client";

import { Header } from "@/components/ui/header-2";
import { PulseFitHero } from "@/components/ui/pulse-fit-hero";

export default function Home() {
  return (
    <div className="w-full">
      <Header />
      <PulseFitHero
        title="Design que transforma marcas em experiências."
        subtitle="Criamos identidades visuais, websites e experiências digitais que conectam sua marca ao público certo. Design estratégico com propósito."
        primaryAction={{
          label: "Ver portfólio",
          onClick: () => console.log("Ver portfólio"),
        }}
        secondaryAction={{
          label: "Solicitar orçamento",
          onClick: () => console.log("Solicitar orçamento"),
        }}
        programs={[
          {
            image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=500&fit=crop",
            category: "BRANDING",
            title: "Identidade Visual",
          },
          {
            image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&h=500&fit=crop",
            category: "WEB DESIGN",
            title: "Sites & Landing Pages",
          },
          {
            image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=500&fit=crop",
            category: "UI/UX",
            title: "Design de Interfaces",
          },
          {
            image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=500&fit=crop",
            category: "SOCIAL MEDIA",
            title: "Design para Redes Sociais",
          },
          {
            image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=500&fit=crop",
            category: "PRINT",
            title: "Material Gráfico",
          },
        ]}
      />
    </div>
  );
}
