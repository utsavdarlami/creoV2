import React, {Fragment} from "react";
import Form from "./Form";
import Posts from "./Posts";

function PostDashboard(){
    return(
        <Fragment>
            <Form />
            <Posts />
        </Fragment>
    );
}

export default PostDashboard;