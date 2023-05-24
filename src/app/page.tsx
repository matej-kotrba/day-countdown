import { Fragment, Suspense } from "react";
import Navbar from "~/components/Navbar";

export default function Home() {
  return (
    <Fragment>
      <Suspense fallback={<p>Loading ...</p>}>
        {/* @ts-ignore */}
        <Navbar />
      </Suspense>
      <p>asoduhasiugd</p>
    </Fragment>
  );
}
