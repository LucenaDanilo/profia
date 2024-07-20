"use client";
import { signIn } from "next-auth/react";
import type { ReactNode } from "react";

type Props = {
	provider: "google" | "github";
	callbackUrl?: string;
	children?: ReactNode;
};

const LoginSocialButton = ({ children, provider, callbackUrl }: Props) => {
	return (
		<button className=""
			onClick={async () => {
				signIn(provider, { redirect: true, callbackUrl });
			}}
		>
			{children}
		</button>
	);
};

export default LoginSocialButton;