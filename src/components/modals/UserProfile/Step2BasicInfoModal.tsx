"use client";
import React, { useState } from "react";
import Image from "next/image";
import TextInput from "@/components/TextAreaInput/TextInput";
import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";

const BasicInfoSchema = Yup.object().shape({
  displayName: Yup.string()
    .min(2, "Display name must be at least 2 characters")
    .required("Display name is required"),
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .matches(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores")
    .required("Username is required"),
});

interface BasicInfoFormValues {
  displayName: string;
  username: string;
}

type Props = {
  onNext: (data: BasicInfoFormValues) => void;
  onBack: () => void;
  totalSteps?: number;
  currentStep?: number;
  initialData?: Partial<BasicInfoFormValues>;
};

const Step2BasicInfoModal = ({ 
  onNext, 
  onBack, 
  totalSteps = 5, 
  currentStep = 2,
  initialData = {}
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      displayName: initialData.displayName || "",
      username: initialData.username || "",
    },
    validationSchema: BasicInfoSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
      setIsLoading(false);
      onNext(values);
    },
  });

  return (
    <div className="max-w-3xl w-full mx-auto px-4 sm:px-6 pt-6 pb-10 text-white">
      {/* Progress Image */}
      <div className="flex justify-center mb-6">
        <Image
          src="/dev_images/mobile-progress-2.png"
          alt="Basic Information"
          width={300}
          height={300}
          className="rounded-2xl w-full max-w-md h-auto"
        />
      </div>

      {/* Step Dots */}
      <div className="flex justify-center gap-2 mb-8">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition ${
              i + 1 === currentStep ? "bg-yellow-500" : i + 1 < currentStep ? "bg-yellow-500/60" : "bg-white/40"
            }`}
          ></div>
        ))}
      </div>

      {/* Title */}
      <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-center">
        Basic Information
      </h3>

      {/* Description */}
      <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-8 text-center max-w-2xl mx-auto">
        Tell us a bit about yourself. Your display name is how others will see you, 
        and your username is your unique identifier.
      </p>

      {/* Form */}
      <FormikProvider value={formik}>
        <Form className="space-y-6 max-w-md mx-auto">
          <div>
            <label className="block text-sm font-medium mb-2">Display Name</label>
            <TextInput
              id="displayName"
              type="text"
              placeholder="e.g., Sarah Johnson"
              {...formik.getFieldProps("displayName")}
              className="w-full"
            />
            {formik.touched.displayName && formik.errors.displayName && (
              <p className="text-red-400 text-sm mt-1">{formik.errors.displayName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Username</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 text-sm z-10">@</span>
              <TextInput
                id="username"
                type="text"
                placeholder="username123"
                {...formik.getFieldProps("username")}
                className="w-full pl-8"
              />
            </div>
            {formik.touched.username && formik.errors.username && (
              <p className="text-red-400 text-sm mt-1">{formik.errors.username}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-4 pt-6">
            <button
              type="submit"
              disabled={isLoading || !formik.isValid}
              className="w-full bg-yellow-500 hover:bg-yellow-400 disabled:bg-yellow-500/50 disabled:cursor-not-allowed text-black font-bold py-4 px-8 rounded-2xl shadow-lg transition"
            >
              {isLoading ? "Saving..." : "Continue"}
            </button>
            
            <button
              type="button"
              onClick={onBack}
              className="w-full bg-transparent hover:bg-white/10 text-white/70 hover:text-white font-medium py-4 px-8 rounded-2xl border border-white/20 transition"
            >
              Back
            </button>
          </div>
        </Form>
      </FormikProvider>
    </div>
  );
};

export default Step2BasicInfoModal;