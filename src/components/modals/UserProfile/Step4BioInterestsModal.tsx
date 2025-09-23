"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";

const BioInterestsSchema = Yup.object().shape({
  bio: Yup.string()
    .max(150, "Bio must be less than 150 characters"),
  interests: Yup.array().min(1, "Please select at least one interest"),
});

interface BioInterestsFormValues {
  bio: string;
  interests: string[];
}

type Props = {
  onNext: (data: BioInterestsFormValues) => void;
  onBack: () => void;
  totalSteps?: number;
  currentStep?: number;
  initialData?: Partial<BioInterestsFormValues>;
};

const INTEREST_OPTIONS = [
  "Action", "Adventure", "Comedy", "Drama", "Fantasy", "Horror",
  "Romance", "Sci-Fi", "Thriller", "Mystery", "Slice of Life", "Sports",
  "Supernatural", "Historical", "Mecha", "Shounen", "Shoujo", "Seinen"
];

const Step4BioInterestsModal = ({ 
  onNext, 
  onBack, 
  totalSteps = 5, 
  currentStep = 4,
  initialData = {}
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      bio: initialData.bio || "",
      interests: initialData.interests || [],
    },
    validationSchema: BioInterestsSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
      setIsLoading(false);
      onNext(values);
    },
  });

  const toggleInterest = (interest: string) => {
    const currentInterests = formik.values.interests;
    const newInterests = currentInterests.includes(interest)
      ? currentInterests.filter(i => i !== interest)
      : [...currentInterests, interest];
    
    formik.setFieldValue("interests", newInterests);
  };

  return (
    <div className="max-w-3xl w-full mx-auto px-4 sm:px-6 pt-6 pb-10 text-white">
      {/* Progress Image */}
      <div className="flex justify-center mb-6">
        <Image
          src="/dev_images/mobile-progress-4.png"
          alt="Bio and Interests"
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
        Tell Us About Yourself
      </h3>

      {/* Description */}
      <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-8 text-center max-w-2xl mx-auto">
        Share a bit about yourself and let us know what kind of comics you enjoy. 
        This helps us recommend content you'll love!
      </p>

      {/* Form */}
      <FormikProvider value={formik}>
        <Form className="space-y-8 max-w-2xl mx-auto">
          {/* Bio Section */}
          <div>
            <label className="block text-sm font-medium mb-3">
              Bio <span className="text-white/50">(Optional)</span>
            </label>
            <div className="relative">
              <textarea
                {...formik.getFieldProps("bio")}
                placeholder="Tell us a bit about yourself... What got you into comics? What are your favorite genres?"
                rows={4}
                maxLength={150}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:border-yellow-500 focus:bg-white/10 transition resize-none text-white placeholder:text-white/50"
              />
              <div className="absolute bottom-2 right-2 text-xs text-white/50">
                {formik.values.bio.length}/150
              </div>
            </div>
            {formik.touched.bio && formik.errors.bio && (
              <p className="text-red-400 text-sm mt-1">{formik.errors.bio}</p>
            )}
          </div>

          {/* Interests Section */}
          <div>
            <label className="block text-sm font-medium mb-3">
              What types of comics interest you? <span className="text-red-400">*</span>
            </label>
            <p className="text-white/50 text-sm mb-4">
              Select all that apply (at least 1 required)
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {INTEREST_OPTIONS.map((interest) => (
                <button
                  key={interest}
                  type="button"
                  onClick={() => toggleInterest(interest)}
                  className={`px-3 py-2 rounded-lg border text-sm font-medium transition ${
                    formik.values.interests.includes(interest)
                      ? "bg-yellow-500 text-black border-yellow-500"
                      : "bg-white/5 text-white border-white/20 hover:bg-white/10 hover:border-white/40"
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
            
            {formik.touched.interests && formik.errors.interests && (
              <p className="text-red-400 text-sm mt-2">{formik.errors.interests}</p>
            )}

            {formik.values.interests.length > 0 && (
              <p className="text-yellow-500 text-sm mt-2">
                {formik.values.interests.length} interest{formik.values.interests.length > 1 ? 's' : ''} selected
              </p>
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

export default Step4BioInterestsModal;