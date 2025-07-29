type NavbarBtnProps = {
  link: string;
  lucide: React.ReactNode;
};

export default function NavbarBtn({ link, lucide }: NavbarBtnProps) {
  return (
    <a
      href={link}
      className="flex flex-col justify-center items-center p-2 gap-1 rounded-lg text-(--text-secondary) hover:bg-(--secondary-color) hover:text-(--primary-color)"
    >
      <p className="border rounded-xl p-1" >{lucide}</p>
    </a>
  );
}
