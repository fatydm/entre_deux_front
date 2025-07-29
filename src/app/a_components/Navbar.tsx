import NavbarBtn from "./NavbarBtn";

type NavbarItem = {
  lucide: React.ReactNode;
  link: string;
};

type NavbarProps = {
  items: NavbarItem[];
};

export default function Navbar({ items }: NavbarProps) {
  return (
    <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center p-2 bg-white border-t shadow z-50">
      {items.map((item, index) => (
        <NavbarBtn key={index} {...item} />
      ))}
    </nav>
  );
}
