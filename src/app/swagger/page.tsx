import dynamic from "next/dynamic";
import "swagger-ui-react/swagger-ui.css";

const SwaggerUI = dynamic(() => import("swagger-ui-react"), { ssr: false });

const SwaggerPage = () => {
  return (<div className="bg-white">
        <SwaggerUI url="/api/docs" />
    </div>)
};

export default SwaggerPage;
