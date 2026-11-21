import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

// Public pages share the navbar and footer.
export default function RootGroupLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
