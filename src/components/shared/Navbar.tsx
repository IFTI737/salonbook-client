import Logo from "./Logo";
import NavLinks from "./NavLinks";
import MobileNav from "./MobileNav";
import UserMenu from "./UserMenu";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/75 backdrop-blur-xl">
      <nav className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
        <Logo />

        <NavLinks className="hidden lg:flex" />

        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <UserMenu />
          <MobileNav />
        </div>
      </nav>
    </header>
  );
}
