interface MainButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
}

export const MainButton = ({
  children,
  onClick,
  className = "",
  type = "button",
}: MainButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`bg-secondary-200 text-black-200 font-recursive text-sm rounded-full px-7 py-3 border-[3px] border-black-200 shadow-[2px_2px_0_0_black] transition-all duration-200 font-medium ${className} hover:scale-105`}
    >
      {children}
    </button>
  );
};

export const MainButton2 = ({
  children,
  onClick,
  className = "",
}: MainButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`bg-black/10 text-white font-recursive text-sm rounded-full px-7 py-3 border border-black/70 shadow-[2px_2px_0_0_black] transition-all duration-200 font-medium ${className} hover:scale-105`}
    >
      {children}
    </button>
  );
};

export const AnchorButton = ({
  children,
  onClick,
  className = "",
  href = "#",
}: MainButtonProps & { href: string }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className={`cursor-pointer bg-secondary-200 text-black-200 font-recursive text-sm rounded-full px-7 py-3 border-[3px] border-black-200 shadow-[2px_2px_0_0_black] transition-all duration-200 font-medium ${className} hover:scale-105`}
    >
      {children}
    </a>
  );
};


export const SecondaryAnchorButton = ({
  children,
  onClick,
  className = "",
  href = "#",
}: MainButtonProps & { href: string }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className={`bg-black/10 text-white font-recursive text-sm rounded-full px-7 py-3 border border-black/70 shadow-[2px_2px_0_0_black] transition-all duration-200 font-medium ${className} hover:scale-105`}
    >
      {children}
    </a>
  );
};

export const GradientButton = ({
  children,
  onClick,
  className = "",
  type = "button",
  disabled = false,
}: MainButtonProps & { disabled?: boolean }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`bg-secondary-300 disabled:bg-secondary-300/50 disabled:cursor-not-allowed text-black font-bold rounded-xl shadow-lg transition-none ${className}`}
    >
      {children}
    </button>
  );
};

export const OrangeButton = ({
  children,
  onClick,
  className = "",
  type = "button",
  disabled = false,
}: MainButtonProps & { disabled?: boolean }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`bg-secondary-300 disabled:bg-secondary-300/50 disabled:cursor-not-allowed text-black font-bold rounded-xl shadow-lg transition-none ${className}`}
    >
      {children}
    </button>
  );
};
