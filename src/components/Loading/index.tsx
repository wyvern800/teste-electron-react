import React, { CSSProperties } from "react";

import { useGlobalContext } from "../../features/contexts/global";
import CircularLoader from "react-spinners/ClipLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto"
};

const Loading: React.FC = () => {
  const { data } = useGlobalContext();
  const { isDarkMode } = data;

   return (
    <div className="sweet-loading">
      <CircularLoader
        color={isDarkMode ? "#fff" : "#000"}
        loading={true}
        cssOverride={override}
        size={35}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default Loading;