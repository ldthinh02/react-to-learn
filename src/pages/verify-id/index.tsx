import ErrorMessage from "@/components/ErrorMessage";
import HeaderSeo from "@/components/HeaderSeo";
import InputFormik from "@/components/InputFormik";
import UploadVerifyIdPicture from "@/components/UploadVerifyIdPicture";
import { useAuthentication } from "@/hooks/useAuthentication";
import { useVerifyId } from "@/hooks/useVerifyId";
import { verfiyIdSchema } from "@/utils/validations";
import { useFormik } from "formik";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

export default function VerifyId() {
  const router = useRouter();
  const [frontImage, setFrontImage] = useState("");
  const [backImage, setBackImage] = useState("");
  const { isLoggedIn } = useAuthentication();
  const from = router.query.from;

  const {
    mutate: verifyId,
    isLoading: isVerifyIdLoading,
    isError: isVerifyIdError,
    error: verifyIdError,
  } = useVerifyId();
  const formik = useFormik({
    initialValues: {
      option: "",
      birthday: "",
    },
    validationSchema: verfiyIdSchema,
    onSubmit: (values) => {
      if (!frontImage || !backImage) {
        return;
      }
      verifyId(
        {
          frontImage,
          backImage,
          from: from as string,
          birthday: values.birthday,
        },
        {
          onSuccess: () => {
            if (from === "bank-transfer") {
              router.push("/receive-payment/bank-confirmed");
            } else {
              router.push("/verify-id/submitted");
            }
          },
        }
      );
    },
  });
  if (!isLoggedIn) {
    return null;
  }

  return (
    <div>
      <HeaderSeo
        title="GanniRepeat - Verify Id"
        description="GanniRepeat - Verify Id"
      />

      {/*verifyID*/}
      <div className="page-title text-center py-12">
        <div className="container m-auto px-4 xl2:max-w-screen-xl2">
          <h1 className="text-3xl font-helveticaNeueLTCom85Heavy text-dark uppercase">
            verify your id
          </h1>
          <div className="text-sm lg:w-10/12 m-auto">
            <p>We need some more information to process your bank payment</p>
          </div>
        </div>
      </div>
      <div className="verifyID-sec pb-20">
        <div className="container m-auto px-4 xl2:max-w-screen-xl2">
          <div className="w-full lg:px-20">
            <p className="text-lg mb-4">Select ID Document</p>
            <form action="#" onSubmit={formik.handleSubmit}>
              <div className="mb-6">
                <label className="custom-radio cursor-pointer block">
                  <input
                    type="radio"
                    className="hidden"
                    name="option"
                    onChange={formik.handleChange}
                    value="driver-id"
                  />
                  <span
                    className={`relative block pl-8 before:absolute before:top-px before:left-0 before:bg-white before:border before:border-dark before:block before:w-[20px] before:h-[20px] before:rounded-full after:absolute after:top-[7px] after:left-[6px] after:hidden after:w-[8px] after:h-[8px] after:rounded-full after:bg-white text-sm ${
                      formik.errors.option && formik.touched.option
                        ? "text-pink"
                        : "text-black"
                    }`}
                  >
                    DRIVING LICENSE
                  </span>
                </label>
              </div>
              <p>Use your government issues drivers license</p>
              {/*Line*/}
              <hr className="border-t-grey my-8" />
              <div className="mb-6">
                <label className="custom-radio cursor-pointer block">
                  <input
                    type="radio"
                    className="hidden"
                    name="option"
                    onChange={formik.handleChange}
                    value="national-id"
                  />
                  <span
                    className={`relative block pl-8 before:absolute before:top-px before:left-0 before:bg-white before:border before:border-dark before:block before:w-[20px] before:h-[20px] before:rounded-full after:absolute after:top-[7px] after:left-[6px] after:hidden after:w-[8px] after:h-[8px] after:rounded-full after:bg-white text-sm ${
                      formik.errors.option && formik.touched.option
                        ? "text-pink"
                        : "text-black"
                    }`}
                  >
                    NATIONAL ID CARD
                  </span>
                </label>
              </div>
              <p className="mb-8">
                Use a government issued ID card; Photo card, Non-driver photo
                ID, Permanent Resident card, Certificate of Indian Status card.
              </p>
              {/*Line*/}
              <hr className="border-t-dark my-8" />
              <p className="text-lg mb-6">Please confirm your birth date</p>
              <InputFormik
                name="birthday"
                label="Date of birth"
                placeholder="DD/MM/YYYY"
                onChange={formik.handleChange}
                value={formik.values.birthday}
                errorMessage={
                  formik.errors.birthday && formik.touched.birthday
                    ? formik.errors.birthday
                    : ""
                }
              />
              <hr className="border-t-dark my-8" />
              <p className="text-lg mb-6">Upload documents</p>
              <p className="mb-6">
                Please upload the front and back of your ID document as
                photographs or scans. Ensure the entire document fits within the
                image and that the information is legible. We accept JPEG, PNG
                and PDF files only.
              </p>
              {/*Files upload*/}
              <div className="flex flex-wrap mb-12 space-x-6">
                <div className="w-2/4 md:w-250">
                  <div className="bg-grey mr-2 lg:mr-6 cursor-pointer"></div>
                  <UploadVerifyIdPicture
                    onChangePhoto={setFrontImage}
                    image={frontImage}
                    id="upload-front"
                    required={formik.isSubmitting && !frontImage}
                  >
                    UPLOAD FRONT
                  </UploadVerifyIdPicture>
                </div>
                <div className="w-2/4 md:w-250">
                  <div className="bg-grey lg:mr-6 cursor-pointer"></div>
                  <UploadVerifyIdPicture
                    onChangePhoto={setBackImage}
                    image={backImage}
                    id="back-front"
                    required={formik.isSubmitting && !backImage}
                  >
                    UPLOAD BACK
                  </UploadVerifyIdPicture>
                </div>
              </div>
              {/*./Files upload*/}
              {/*info*/}
              <div className="border border-pink p-4 flex items-center mb-8 lg:mb-12">
                <div className="w-6">
                  <Image
                    className="w-full"
                    src="/assets/images/Info.svg"
                    alt=""
                    width="100%"
                    height="100%"
                  />
                </div>
                <div className="pl-4 text-sm flex-1">
                  <p className="mb-0">
                    We need this information in order to safely pay for a sale.
                    This information is only used to process your payment
                    safely.
                  </p>
                </div>
              </div>
              {isVerifyIdError && (
                <ErrorMessage
                  message={(verifyIdError as Error).message}
                ></ErrorMessage>
              )}
              {/*./info*/}
              <div className="mb-6">
                <button
                  type="submit"
                  className="font-helveticaNeue500 text-center px-3 transition-all border border-dark inline-block text-white bg-dark hover:border-dark hover:text-dark hover:bg-white text-xs uppercase w-full py-4 tracking-widest"
                  disabled={isVerifyIdLoading}
                >
                  {isVerifyIdLoading ? "Loading..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/*./verifyID*/}
    </div>
  );
}
