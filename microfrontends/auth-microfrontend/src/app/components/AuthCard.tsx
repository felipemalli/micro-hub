interface AuthCardProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  title: string;
  description: string;
  children: React.ReactNode;
}

export const AuthCard = ({ onSubmit, title, description, children }: AuthCardProps) => { return (
  <div className="h-screen-minus-header flex items-center justify-center">

    <div className="bg-white rounded-lg shadow-md p-8 mx-auto flex flex-col max-w-md">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{title}</h1>
        <p className="text-gray-600">{description}</p>
      </div>
      <form onSubmit={onSubmit} className="space-y-6">
        {children}
      </form>
    </div>
  </div>
  );
};