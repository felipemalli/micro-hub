import { SVGProps } from "react";

export const Icon = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg
			width="25"
			height="25"
			viewBox="0 0 25 25"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<g clip-path="url(#clip0_626_2290)">
				<path
					d="M1.13623 4.51562V10.5156H7.13623"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M23.1362 20.5156V14.5156H17.1362"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M20.6262 9.51521C20.1191 8.082 19.2571 6.80062 18.1208 5.79063C16.9844 4.78065 15.6108 4.07498 14.1279 3.73947C12.6451 3.40396 11.1015 3.44955 9.64104 3.87199C8.1806 4.29442 6.85098 5.07993 5.77623 6.15521L1.13623 10.5152M23.1362 14.5152L18.4962 18.8752C17.4215 19.9505 16.0919 20.736 14.6314 21.1584C13.171 21.5809 11.6273 21.6265 10.1445 21.291C8.6617 20.9554 7.28803 20.2498 6.1517 19.2398C5.01536 18.2298 4.1534 16.9484 3.64623 15.5152"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</g>
			<defs>
				<clipPath id="clip0_626_2290">
					<rect
						width="24"
						height="24"
						fill="white"
						transform="translate(0.13623 0.515625)"
					/>
				</clipPath>
			</defs>
		</svg>
	);
};
