import ContactSection from "@/components/ContactSection";

export const metadata = {
  title: "Solicitar orçamento",
  description: "Solicite um orçamento de site institucional, sistema interno ou dispositivo IoT com a Hydra Technologies. Resposta em até 1 dia útil.",
  alternates: { canonical: "/contato" },
};

export default function ContatoPage() {
  return (
    <main className="page-contact">
      <ContactSection standalone />
    </main>
  );
}
