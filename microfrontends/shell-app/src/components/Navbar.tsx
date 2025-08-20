import { Link } from "react-router-dom";

interface NavLinkProps {
	to: string;
	icon: string;
	label: string;
}

const NavLink = ({ to, icon, label }: NavLinkProps) => (
	<Link to={to} className="nav-link">
		<span className="flex items-center space-x-2">
			<span>{icon}</span>
			<span className="hidden sm:inline">{label}</span>
		</span>
	</Link>
);

export const Navbar = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
	return (
		<nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50 h-16">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					<div className="flex items-center justify-between w-full space-x-8">
						<Link to="/" className="text-2xl font-bold text-gray-800">
							<span className="flex items-center space-x-2">
								<span>🚀</span>
								<span className="hidden sm:inline">Micro Hub</span>
							</span>
						</Link>
						<div className="flex space-x-4">
							<NavLink to="/rickmorty" icon="👽" label="Rick & Morty" />
							<NavLink to="/auth" icon="🔐" label="Autenticação" />
						</div>
					</div>
					<div className="flex items-center space-x-4">
						{isAuthenticated && (
							<span className="text-sm text-green-600 font-medium">
								<span className="flex items-center space-x-1">
									<span>✅</span>
									<span className="hidden sm:inline">Autenticado</span>
								</span>
							</span>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
};
