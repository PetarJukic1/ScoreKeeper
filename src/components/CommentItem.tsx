import React from "react";
import Comment from "./Comment";
import {GetEmail, IsAdmin, IsLoggedIn} from "./Profile";
import Spacer from "./Spacer";

export default function CommentItem({comment, roundId, commentId, deleteCallback}: {comment: Comment, roundId: number, commentId: number, deleteCallback: (roundId: number, commentId: number) => void}){
    const isLoggedIn = IsLoggedIn()
    const isAdmin = IsAdmin()
    const email = GetEmail()
    return <div>
        <b>{comment.author}:</b> {comment.text} <i>created: {comment.createdAt}</i>
        <Spacer x={2}/>
        {((isLoggedIn && (email === comment.author)) || isAdmin) && (<><button>Edit</button> <button onClick={() => deleteCallback(roundId, commentId)}>Delete</button> </>)}
    </div>
}