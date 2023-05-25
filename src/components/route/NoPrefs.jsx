import Link from "next/link";
import React from "react";

const NoPrefs = () => {
  return (
    <div className="flex flex-col mx-4">
      <div>You have not set your preferences</div>
      <Link href="/preferences" className="btn">
        To prefrences
      </Link>
    </div>
  );
};

export default NoPrefs;
