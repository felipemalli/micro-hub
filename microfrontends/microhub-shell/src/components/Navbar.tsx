import { Link } from "react-router-dom";

interface NavLinkProps {
	to: string;
	icon: string;
	label: string;
}

const NavLink = ({ to, icon, label }: NavLinkProps) => (
	<Link to={to} className="nav-link">
		<span className="flex items-center space-x-2">
			<span className="text-lg">{icon}</span>
			<span className="hidden text-lg sm:block">{label}</span>
		</span>
	</Link>
);

export const Navbar = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
	return (
		<nav className="sticky top-0 z-50 h-16 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex h-16 items-center justify-between">
					<div className="flex w-full items-center justify-between space-x-8">
						<Link to="/" className="text-2xl font-bold text-gray-800">
							<p className="flex items-center space-x-2">
								<span className="text-lg">🚀</span>
								<span className="hidden text-lg sm:block">Micro Hub</span>
							</p>
						</Link>
						<div className="flex space-x-4">
							<NavLink to="/rickmorty" icon="👽" label="Rick & Morty" />
							{isAuthenticated ? (
								<NavLink to="/auth" icon="🔐" label="Perfil" />
							) : (
								<NavLink to="/auth" icon="🔐" label="Entrar" />
							)}
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};
