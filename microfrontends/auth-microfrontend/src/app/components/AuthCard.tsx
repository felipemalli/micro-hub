interface AuthCardProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  title: string;
  description: string;
  children: React.ReactNode;
}

export const AuthCard = ({ onSubmit, title, description, children }: AuthCardProps) => { return (
  <div className="h-screen-minus-header flex items-center justify-center py-4 sm:my-16 px-4">
    <div className="bg-white rounded-lg sm:shadow-md px-6 py-8 sm:px-8 sm:py-8 flex flex-col sm:max-w-md w-full gap-8">
      <div className="flex flex-col gap-2 sm:items-center">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <form onSubmit={onSubmit} className="flex flex-col gap-8">
        {children}
      </form>
    </div>
  </div>
  );
};