import { getCookie } from "cookies-next";

const OTP_EXPIRATION_TIME = 5 * 60 * 1000; // 5 minutes

export const storeOTPSentStatus = () => {
	const expirationTime = Date.now() + OTP_EXPIRATION_TIME;
	localStorage.setItem(
		"otpSent",
		JSON.stringify({ status: true, expirationTime }),
	);
};

export const storeOTPVerificationStatus = (status: boolean) => {
	localStorage.setItem("otpVerified", JSON.stringify({ status }));
};

export const isOTPValid = () => {
	const otpData = localStorage.getItem("otpSent");
	if (!otpData) return false;

	const { status, expirationTime } = JSON.parse(otpData);

	if (!status || Date.now() > expirationTime) {
		localStorage.removeItem("otpSent");
		return false;
	}

	return true;
};

export const isOTPVerified = () => {
	const otpData = localStorage.getItem("otpVerified");
	if (!otpData) return false;

	const { status } = JSON.parse(otpData);

	if (!status) {
		localStorage.removeItem("otpVerified");
		return;
	}
	return status;
};

export const getOTPEXpirationTime = () => {
	const otpData = localStorage.getItem("otpSent");
	if (!otpData) return null;

	const { expirationTime } = JSON.parse(otpData);
	const timeLeft = expirationTime - Date.now();
	if (timeLeft <= 0) return 0;

	return timeLeft; // convert to minutes
};

export const startCountdown = (
	setCountdown: React.Dispatch<React.SetStateAction<number>>,
	setIsResendDisabled: React.Dispatch<React.SetStateAction<boolean>>,
) => {
	const timer = setInterval(() => {
		setCountdown((prevCountdown) => {
			const newCountdown = prevCountdown - 1;
			if (newCountdown <= 0) {
				clearInterval(timer); // Stop the timer when it reaches 0
				setIsResendDisabled(false); // Enable the "Resend OTP" button
				localStorage.removeItem("otpSent"); // remove from localstorage
				return 0; // Prevent countdown from going negative
			}
			return newCountdown;
		});
	}, 1000);

	return () => clearInterval(timer); // Cleanup the timer
};

export function convertSecondsToMinutes(seconds: number): string {
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = seconds % 60;
	return `${minutes}m ${remainingSeconds}s`;
}

export const isAuthenticated = () => {
	const token = getCookie("token");
	const role = getCookie("role");
	const email = getCookie("email");

	return !!token && !!role && !!email;
};
