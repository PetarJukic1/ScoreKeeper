import React from "react";
import Spacer from "./Spacer";
import Comment from "./Comment";
import CommentItem from "./CommentItem";

export default function CommentList({comments, roundId, deleteCallback}: { comments: Array<Comment>, roundId: number, deleteCallback: (roundId: number, commentId: number) => void}) {
    return (
        <>
            <div className="commentSection">
                <Spacer x={2}/>
                <h3>
                    Comments({comments.length}):
                </h3>
            </div>

            {comments.map((comment, index) =>
                <div key = {index+100} className="commentSection">
                    <Spacer x={4}/>
                    <CommentItem key={index} comment={comment} roundId={roundId} commentId={index} deleteCallback={deleteCallback}/>
                </div>
            )}

        </>
    );
}