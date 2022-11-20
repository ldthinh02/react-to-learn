import Select from "@/components/Select";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import Input from "@/components/Input";
import { reportIssuePackageSchema } from "@/utils/validations";
import { PROBLEMS } from "@/utils/constants";
import UploadClaimPicture from "@/components/UploadClaimPicture";
import { useState } from "react";
import { useAuthentication } from "@/hooks/useAuthentication";
import { useCreateClaim } from "@/hooks/useCreateClaim";
import ErrorMessage from "@/components/ErrorMessage";
import HeaderSeo from "@/components/HeaderSeo";

export default function ReportIssue() {
  const router = useRouter();
  const order_package_id = router.query?.id as string;
  const [claimPictures, setClaimPictures] = useState<string[]>([]);
  const { isLoggedIn } = useAuthentication();
  const {
    mutate: createReport,
    isLoading: isCreateReportLoading,
    isError: isCreateReportError,
    error: createReportError,
  } = useCreateClaim();

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: reportIssuePackageSchema,
    initialValues: {
      problem: undefined,
      comment: "",
    },
    onSubmit: (values) => {
      createReport(
        {
          problem: `${values.problem}`,
          comment: `${values.comment}`,
          images: claimPictures,
          order_package_id: order_package_id,
        },
        {
          onSuccess: () => {
            router.push("/report-an-issue/submitted");
          },
        }
      );
    },
  });

  const onChangeSelect = (value: Option) => {
    formik.setFieldValue(`${value.field}`, value.name);
  };
  if (!isLoggedIn) {
    return null;
  }

  return (
    <div>
      <HeaderSeo
        title="GanniRepeat - Report an Issue"
        description="GanniRepeat - Report an Issue"
      />

      {/*ReportAnIssue*/}
      <div className="page-title text-center py-12">
        <div className="container m-auto px-4 xl2:max-w-screen-xl2">
          <h1 className="text-3xl font-helveticaNeueLTCom85Heavy text-dark uppercase">
            Report an issue with your order
          </h1>
          <div className="text-sm lg:w-10/12 m-auto">
            <p>
              Please provide details on the issue with your order and we will
              try to resolve it as soon as possible.
            </p>
          </div>
        </div>
      </div>
      <div className="reportAnIssue-sec pb-20">
        <div className="container m-auto px-4 xl2:max-w-screen-xl2">
          <div className="w-full lg:px-20">
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-6">
                <Select
                  label="Please specify the problem"
                  name="problem"
                  classes="mt-2"
                  typeChar="normal-case"
                  onChange={onChangeSelect}
                  data={PROBLEMS}
                  error={formik.errors.problem}
                  touched={formik.touched.problem}
                  errorMessage={
                    formik.errors.problem && formik.touched.problem
                      ? formik.errors.problem
                      : ""
                  }
                />
              </div>
              <div className="mb-6">
                <Input
                  title="Comments"
                  textarea={true}
                  name="comment"
                  numberCheck={1000}
                  placeholder="Eg. Leather mini dress"
                  onChange={formik.handleChange}
                />
              </div>
              {/*Line*/}
              <div className="my-12">
                <hr className="my-7 border-t-dark" />
              </div>
              <div className="text-sm mb-12">
                <h3 className="font-helveticaNeue500 text-lg mb-4">
                  Upload attachments
                </h3>
                <p className="pb-6">
                  Please provide any relevant photos or attachements to support
                  your query. We accept JPEG, PNG and PDF files only.
                </p>
                <UploadClaimPicture
                  claimPictures={claimPictures}
                  onChangePhoto={setClaimPictures}
                />
                <input type="file" id="file-01" className="hidden" />
              </div>
              {isCreateReportError && (
                <ErrorMessage
                  message={(createReportError as Error).message}
                ></ErrorMessage>
              )}
              <div className="mb-6 flex -mx-2">
                <div className="w-2/4 px-2">
                  <button className="font-helveticaNeue500 text-center px-3 transition-all border border-dark inline-block  text-dark hover:border-dark hover:text-white hover:bg-dark text-xs uppercase w-full py-4 tracking-widest">
                    Back
                  </button>
                </div>
                <div className="w-2/4 px-2">
                  <button
                    disabled={isCreateReportLoading}
                    type="submit"
                    className="font-helveticaNeue500 text-center px-3 transition-all border border-dark inline-block  text-white bg-dark hover:border-dark hover:text-dark hover:bg-white text-xs uppercase w-full py-4 tracking-widest"
                  >
                    {isCreateReportLoading ? "Loading..." : "Submit"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/*./ReportAnIssue*/}
    </div>
  );
}
