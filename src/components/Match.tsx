import React from "react";
import Opponents from "./Opponents";

export default interface Match {
    id: string,
    opponents: Opponents,
    finished: boolean,
    goals: Array<number>,
}