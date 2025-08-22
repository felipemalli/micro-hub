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
			<g clip-path="url(#clip0_625_2286)">
				<path
					d="M10.405 4.65903L1.93501 18.799C1.76038 19.1015 1.66798 19.4443 1.667 19.7936C1.66602 20.1428 1.7565 20.4862 1.92944 20.7896C2.10237 21.093 2.35174 21.3458 2.65272 21.5229C2.9537 21.7 3.29581 21.7952 3.64501 21.799H20.585C20.9342 21.7952 21.2763 21.7 21.5773 21.5229C21.8783 21.3458 22.1276 21.093 22.3006 20.7896C22.4735 20.4862 22.564 20.1428 22.563 19.7936C22.562 19.4443 22.4696 19.1015 22.295 18.799L13.825 4.65903C13.6467 4.36514 13.3957 4.12215 13.0962 3.95352C12.7967 3.78488 12.4587 3.69629 12.115 3.69629C11.7713 3.69629 11.4333 3.78488 11.1338 3.95352C10.8343 4.12215 10.5833 4.36514 10.405 4.65903Z"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d="M12.1152 9.79883V13.7988"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d="M12.1152 17.7988H12.1252"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</g>
			<defs>
				<clipPath id="clip0_625_2286">
					<rect
						width="24"
						height="24"
						fill="white"
						transform="translate(0.115234 0.798828)"
					/>
				</clipPath>
			</defs>
		</svg>
	);
};
