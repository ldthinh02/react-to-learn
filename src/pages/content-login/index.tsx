import { useContentAuthLogin } from "@/hooks/useContentAuth";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import Head from "next/head";

const ContentLogin = () => {
  const { query } = useRouter();
  const { login } = useContentAuthLogin();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: login,
  });

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover"
        />
      </Head>
      <form className="w-96 mx-auto py-10" onSubmit={formik.handleSubmit}>
        <label className="block mb-1">Username</label>
        <input
          name="username"
          onChange={formik.handleChange}
          value={formik.values.username}
          className="h-10 w-full border border-brand-gray-600 shadow-none focus:ring-0 focus:shadow-none focus:outline-none px-3"
        />
        <label className="block mt-4 mb-1">Password</label>
        <input
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          type="password"
          className="h-10 mb-4 w-full border border-brand-gray-600 shadow-none focus:ring-0 focus:shadow-none focus:outline-none px-3"
        />
        <p className="mb-4 text-sm text-red-500">
          {query?.error ? "Invalid credentials" : ""}
        </p>
        <button
          type="button"
          onClick={formik.submitForm}
          className="h-10 w-56 block text-white bg-black rounded-sm"
        >
          Login
        </button>
      </form>
    </>
  );
};

export default ContentLogin;
