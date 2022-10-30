import React, {useState, useRef, RefObject} from 'react';
import StandingsTable from "./components/StandingsTable";
import Spacer from "./components/Spacer";
import MatchList from "./components/MatchList";
import {MatchesByRounds, Comments} from "./components/Dataset";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import {IsAdmin, IsLoggedIn, GetEmail} from "./components/Profile";
import {v4 as uuidv4} from 'uuid';

export default function App() {
    const initialToggleEditState = Array.from({length: 20}, i => i = false)
    const [matchesByRounds, setMatchesByRound] = useState(MatchesByRounds)
    const [comments, setComments] = useState(Comments)

    const [toggle1, setToggle1] = useState(false)
    const [toggle2, setToggle2] = useState(false)
    const [toggle3, setToggle3] = useState(false)
    const [toggle4, setToggle4] = useState(false)
    const [toggle5, setToggle5] = useState(false)
    const [toggle6, setToggle6] = useState(false)
    const [toggle7, setToggle7] = useState(false)
    const [toggle8, setToggle8] = useState(false)
    const [toggle9, setToggle9] = useState(false)
    const [toggle10, setToggle10] = useState(false)
    const [toggle11, setToggle11] = useState(false)
    const [toggle12, setToggle12] = useState(false)
    const [toggle13, setToggle13] = useState(false)
    const [toggle14, setToggle14] = useState(false)
    const [toggle15, setToggle15] = useState(false)
    const [toggle16, setToggle16] = useState(false)
    const [toggle17, setToggle17] = useState(false)
    const [toggle18, setToggle18] = useState(false)
    const [toggle19, setToggle19] = useState(false)
    const [toggle20, setToggle20] = useState(false)


    let toggleEdit: Array<boolean> = []
    toggleEdit.push(
        toggle1, toggle2, toggle3, toggle4, toggle5,
        toggle6, toggle7, toggle8, toggle9, toggle10,
        toggle11, toggle12, toggle13, toggle14, toggle15,
        toggle16, toggle17, toggle18, toggle19, toggle20,
    )
    let setToggleEdit: Array<React.Dispatch<React.SetStateAction<boolean>>> = [
        setToggle1, setToggle2, setToggle3, setToggle4, setToggle5,
        setToggle6, setToggle7, setToggle8, setToggle9, setToggle10,
        setToggle11, setToggle12, setToggle13, setToggle14, setToggle15,
        setToggle16, setToggle17, setToggle18, setToggle19, setToggle20,
    ]
    const loggedIn: boolean = IsLoggedIn()
    const isAdmin: boolean = IsAdmin()
    const email: string = GetEmail()
    const editCommentRef = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ];
    const commentRef = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null)
    ];

    const DeleteComments = (roundId: string, commentId: string) => {
        setComments((comments) => {
                let deleteIndex = comments.findIndex((comment) => comment.id === commentId && roundId === comment.roundId)
                comments.splice((deleteIndex === undefined) ? 0:deleteIndex, 1)
                return [...comments]
            }
        );
    };

    const EditComments = (roundId: string, commentId: string, index: number) => {
        const text = editCommentRef[index]?.current?.value
        if (text !== undefined) {
            setComments((comments) => {
                    index = comments.findIndex((comment) => comment.id == commentId)
                    comments[index].text = text
                    console.log(comments)
                    return [...comments]
                }
            );
        }
    };

    const ToggleEdit = (index: number) => {
        setToggleEdit[index]((prevState) => {
            return !prevState
        })
    };

    const AddComment = (roundId: string, index: number) => {
        const text = commentRef[index]?.current?.value
        if (text !== undefined) {
            setComments((comments) => {
                return [...comments, {
                    roundId: roundId,
                    author: email,
                    id: uuidv4(),
                    text: text,
                    createdAt: new Date().toLocaleDateString()
                }]
            })
        }
    }

    return (
        <>
            <div>
                <div className="row">
                    {loggedIn && (<div>{email}</div>)}
                    {isAdmin && (<div>admin</div>)}

                    {loggedIn && (
                        <div>
                            <LogoutButton/>
                        </div>
                    )}
                    {!loggedIn && (<div></div>)}
                    {!loggedIn && (
                        <div className="right">
                            <LoginButton/>
                        </div>
                    )}
                </div>
                <h1 className="center">Score Keeper</h1>
            </div>
            <Spacer y={2}/>

            <div className="subtitle">
                <Spacer x={4}/>

                <h2>Standings:</h2>
            </div>

            <Spacer y={4}/>

            <div className="center">
                <StandingsTable/>
            </div>

            <Spacer y={4}/>

            {matchesByRounds.map((rounds, index) => (
                <div key={rounds.id}>
                    <div className="subtitle">
                        <Spacer x={4}/>

                        <h2>Round {index + 1}:</h2>
                    </div>
                    <div className="commentSection">
                        <Spacer x={4}/>

                        <h2>Comments:</h2>
                    </div>
                    {comments.length > 0 && (
                        <>
                            {comments.map((comment, indexComment) =>
                                    (comment.roundId === rounds.id)
                                    && (
                                        <div key={comment.id} className="commentSection">
                                            <Spacer x={4}/>
                                            <div>
                                                <b>{comment.author}:</b> {comment.text} <i>created: {comment.createdAt}</i>
                                                <Spacer x={2}/>
                                                {((loggedIn && (email === comment.author)) || isAdmin) && (<>
                                                    {toggleEdit[indexComment] &&
                                                        (
                                                            <>
                                                                <input ref={editCommentRef[indexComment]} type="text"/>
                                                                <button
                                                                    onClick={() => EditComments(rounds.id, comment.id, indexComment)}>Confirm
                                                                </button>
                                                            </>
                                                        )
                                                    }
                                                    <button onClick={() => ToggleEdit(indexComment)}>Edit</button>
                                                    <button onClick={() => DeleteComments(rounds.id, comment.id)}>Delete
                                                    </button>
                                                </>)}
                                            </div>
                                        </div>
                                    )
                            )
                            }
                            <Spacer y={3}/>
                            <div className="commentSection">
                                <Spacer x={4}/>
                                <input type="text" ref={commentRef[index]}/>
                                <button onClick={() => AddComment(rounds.id, index)}>Comment</button>
                            </div>
                        </>
                    )}
                    <MatchList key={index} matches={rounds.matches}/>
                </div>
            ))}
        </>
    );
}
