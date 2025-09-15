"use client";
import React, { useState } from "react";
import { MainButton, MainButton2 } from "../button";
import TextInput from "../TextAreaInput/TextInput";
import { Form, FormikProvider, useFormik } from "formik";
import { ImSpinner2 } from "react-icons/im";
import { FaCircleRight } from "react-icons/fa6";
import { LoginSchema } from "../Models/Forms";
import { walletImg } from "../../../public/dev_images";
import Picture from "../picture/Index";
import { FaArrowLeft } from "react-icons/fa";
import { HiEnvelope } from "react-icons/hi2";
import { InputOtp } from "@heroui/react";
import { useRouter } from "next/navigation";

interface WhitePaperModalProps {
	onClose: () => void;
}

interface LoginFormValues {
	email: string;
	password: string;
}

const WhitePaperModal = ({ onClose }: WhitePaperModalProps) => {
	const [showPassword, setShowPassword] = useState(false);
	const [isLogIn, setIsLogIn] = useState(false);
	const [isRegister, setIsRegister] = useState(false);
	const [isVerificationCode, setIsVerificationCode] = useState(false);
	const [isVerifying, setIsVerifying] = useState(false);
	const [otpValue, setOtpValue] = useState("");
	const router = useRouter();

	const handlePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const LoginValues: LoginFormValues = {
		email: "",
		password: "",
	};
	const loginformik = useFormik({
		initialValues: LoginValues,
		validationSchema: LoginSchema,
		enableReinitialize: true,
		onSubmit: (values) => {
			console.log("value", values);
		},
	});

	const handleLogin = () => {
		setIsLogIn(true);
		setIsRegister(false);
	};
	const handleRegister = () => {
		setIsLogIn(false);
		setIsRegister(true);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!isVerificationCode) {
			// Send verification code logic
			setIsVerificationCode(true);
		}
	};

	return (
		<>
			{isRegister ? (
				<div className='mx-auto px-2 pt-12 pb-10 text-white w-[90%]'>
					<div className='space-y-2 text-center w-[80%] mx-auto'>
						<h3 className='text-xl sm:text-2xl font-bold'>
							Register for Quiva
						</h3>
						<p className='text-xs sm:text-sm text-white/80'>
							Where stories earn rewards, and every reader counts.
						</p>
					</div>
				</div>
			) : isLogIn ? (
				<div className='mx-auto px-4 sm:px-6 pt-8 sm:pt-12 pb-8 sm:pb-10 text-white w-full'>
					{/* Header Section */}
					<div className='space-y-2 text-center w-full sm:w-[80%] mx-auto'>
						<h3 className='text-xl sm:text-2xl font-bold'>Log in to Quiva</h3>
						<p className='text-xs sm:text-sm text-white/80'>
							Where stories earn rewards, and every reader counts.
						</p>
					</div>

					{/* Form Section */}
					<FormikProvider value={loginformik}>
						<Form className='space-y-4 sm:space-y-5 w-full sm:w-[80%] mt-4 sm:mt-5 mx-auto'>
							{/* Email Field */}
							<div className='space-y-1'>
								<TextInput
									id='email'
									label='Enter your email'
									type='text'
									className={`w-full px-3 py-3 sm:py-3.5 text-sm sm:text-base border ${
										loginformik.touched.email && loginformik.errors.email
											? "border-red-500"
											: "border-white/20"
									} focus:border-primary-100 bg-transparent rounded-md outline-none text-white placeholder:text-white/80`}
									placeholder='your@email.com'
									{...loginformik.getFieldProps("email")}
								/>
								{loginformik.touched.email && loginformik.errors.email && (
									<div className='text-red-400 text-xs sm:text-sm mt-1'>
										{loginformik.errors.email}
									</div>
								)}
							</div>

							{/* Password Field */}
							<div className='space-y-1'>
								<TextInput
									id='password'
									label='Enter Password'
									type={showPassword ? "text" : "password"}
									className={`w-full px-3 py-3 sm:py-3.5 text-sm sm:text-base border ${
										loginformik.touched.password && loginformik.errors.password
											? "border-red-500"
											: "border-white/20"
									} focus:border-primary-100 bg-transparent rounded-md outline-none text-white placeholder:text-white/80`}
									placeholder=''
									passwordIconClassname='top-3 sm:top-3.5'
									showPasswordIcon
									showPassword={showPassword}
									togglePasswordVisibility={handlePasswordVisibility}
									{...loginformik.getFieldProps("password")}
								/>
								{loginformik.touched.password &&
									loginformik.errors.password && (
										<div className='text-red-400 text-xs sm:text-sm mt-1'>
											{loginformik.errors.password}
										</div>
									)}
							</div>

							{/* Submit Button */}
							<MainButton
								type='submit'
								className='w-full rounded-full font-semibold py-3 sm:py-3.5 text-sm sm:text-base'
							>
								{loginformik.isSubmitting ? (
									<span className='inline-flex items-center justify-center'>
										<svg
											className='animate-spin -ml-1 mr-2 h-4 w-4 text-white'
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'
										>
											<circle
												className='opacity-25'
												cx='12'
												cy='12'
												r='10'
												stroke='currentColor'
												strokeWidth='4'
											></circle>
											<path
												className='opacity-75'
												fill='currentColor'
												d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
											></path>
										</svg>
										Logging in...
									</span>
								) : (
									"Log in"
								)}
							</MainButton>
						</Form>
					</FormikProvider>

					{/* Sign Up Prompt */}
					<div className='text-center text-xs sm:text-sm text-white/80 border-t border-white/10 pt-4 mt-6 w-full sm:w-[70%] mx-auto'>
						Don&apos;t have an account?{" "}
						<button
							onClick={handleRegister}
							className='text-secondary-200 font-semibold cursor-pointer underline-offset-4 hover:underline transition duration-200 focus:outline-none'
						>
							Sign Up
						</button>
					</div>
				</div>
			) : (
				<>
					{isVerificationCode ? (
						<div className='w-full max-w-md mx-auto text-white py-8 sm:py-12 space-y-4 lg:space-y-8'>
							<div className='grid grid-cols-5 items-center w-full gap-0 px-2'>
								{/* Back Button */}
								<div className='col-span-1'>
									<FaArrowLeft
										className='text-white/50 text-xl hover:text-white/90 cursor-pointer transition-[.3] hover:-translate-x-1'
										onClick={() => setIsVerificationCode(false)}
									/>
								</div>

								{/* Title */}
								<h3 className='text-sm sm:text-xl text-center font-bold col-span-3'>
									Confirm verification code
								</h3>
								<div className='col-span-1'></div>
							</div>

							{/* Mail Icon */}
							<div className='flex justify-center mb-4'>
								<div className='w-12 h-12 flex items-center justify-center rounded-full bg-secondary-300/90'>
									<HiEnvelope className='text-black-100 text-3xl' />
								</div>
							</div>

							{/* Email Notice */}
							<p className='text-center text-sm text-white/80 mb-6'>
								We’ve sent a verification code to <br />
								<span className='font-semibold text-white'>
									marysokoh4@gmail.com
								</span>
							</p>

							{/* Code Input Boxes */}
							<InputOtp
								length={6}
								variant='faded'
								size='lg'
								color='warning'
								className='mx-auto'
								// value={code}
								// onChange={(value: any) => setCode(value)}
								onComplete={(value: any) => {
									if (value.length === 6) {
										router.push("/comic-pad");
									}
								}}
								classNames={{
									base: "gap-12",
									input:
										"w-12 h-14 text-center text-lg font-bold rounded-md text-white bg-black-100 border border-white/20 focus:border-secondary focus:ring-1 focus:ring-secondary placeholder:text-white/40",
								}}
								autoComplete='one-time-code'
							/>

							{/* Resend Code */}
							<p className='text-center text-xs text-white/60'>
								Didn’t receive a code? Check spam or <br />
								<button className='hover:text-primary-100 font-medium hover:underline transition-[.3] underline-offset-4'>
									Re-send Code
								</button>
							</p>
						</div>
					) : (
						<form
							onSubmit={handleSubmit}
							className='w-full mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-8 text-white'
						>
							{/* Welcome Header */}
							<div className='space-y-2 text-center w-full sm:w-[80%] mx-auto'>
								<h3 className='text-lg sm:text-2xl font-bold'>
									Login or Sign up
								</h3>
							</div>

							{/* Email Input */}
							<div className='mt-6 relative flex items-center'>
								<input
									type='email'
									placeholder='Enter your email'
									className='w-full px-3 py-4 lg:py-6 text-white/90 bg-gray-300 rounded-md hover:border-primary-100 focus:border-primary-100 focus:outline-none transition-colors duration-200 placeholder:text-white/70 text-base'
									onSubmit={() => handleSubmit}
								/>
								<FaCircleRight
									className='absolute text-2xl lg:text-3xl text-white/70 right-3 cursor-pointer'
									onClick={handleSubmit}
								/>
							</div>

							{/* Divider with "Or" */}
							<div className='relative text-center my-6'>
								<div className='w-full h-px bg-white/10' />
								<span className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black-500 font-semibold px-3 text-xs sm:text-sm text-white/70'>
									Or
								</span>
							</div>

							{/* Connect Wallet Button */}

							<Picture
								src={walletImg}
								alt='home bg'
								loading='eager'
								className='w-full sm:h-full object-cover lg:object-fill grayscale'
							/>

							{/* Terms */}
							<h4 className='text-white/60 text-center text-xs sm:text-sm mt-6 leading-relaxed'>
								If you have not logged in before, you will create a new Quiva
								account. By proceeding, you agree to our <br />
								<b className='text-white'>Terms of Service & Privacy Policy.</b>
							</h4>
						</form>
					)}
				</>
			)}
		</>
	);
};

export default WhitePaperModal;
