import React from "react";
import "./WhyWeMadeThisIndex.scss";
import WhyWeMadeThis from "./WhyWeMadeThis";
import List from "./List";

const WhyWeMadeThisIndex = () => {
    return <section>
        <div className="index">
            <WhyWeMadeThis productid={productId} />
            <List productid={productId} />
        </div>
    </section>
};

export default WhyWeMadeThisIndex;
