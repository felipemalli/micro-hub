import React from "react";

interface InfoItem {
	name: React.ReactNode;
	value: React.ReactNode;
}

interface InfoCardProps {
	title: React.ReactNode;
	content: InfoItem[];
}

export const InfoCard: React.FC<InfoCardProps> = ({ title, content }) => {
	return (
		<div className={`bg-gray-50 rounded-lg p-5 flex flex-col gap-2`}>
			<h6 className="text-gray-500">{title}</h6>
			<div className="flex flex-col gap-2">
				{content.map((item, idx) => (
					<div key={idx} className="flex gap-1">
						<span className="font-medium text-gray-600">{item.name}</span>
						<p className="font-semibold">{item.value}</p>
					</div>
				))}
			</div>
		</div>
	);
};
