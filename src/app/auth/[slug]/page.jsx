import React from "react";

const page = async ({ params }) => {
  const { slug } = await params;

  if (slug === "login") {
    const LoginComponent = React.lazy(() =>
      import("../_components/LoginComponent")
    );
    return (
      <React.Suspense fallback={<div>Loading...</div>}>
        <LoginComponent />
      </React.Suspense>
    );
  } else if (slug === "register") {
    const RegisterComponent = React.lazy(() =>
      import("../_components/RegisterComponent")
    );
    return (
      <React.Suspense fallback={<div>Loading...</div>}>
        <RegisterComponent />
      </React.Suspense>
    );
  } else {
    return <div>Invalid slug</div>;
  }
};

export default page;
