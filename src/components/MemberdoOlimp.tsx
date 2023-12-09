import React, { FC, useContext, useState } from 'react';
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import TeamService from "../services/TeamService";
import ReplyService from "../services/ReplyService";
import ExerciseService from "../services/ExerciseService";
import { ITeam } from "../models/ITeam"
import { IOlimp } from "../models/IOlimp"
import { IExercise } from "../models/IExercise"
import { IReply } from "../models/IReply"
import Moment from 'moment';

const MemberdoOlimp: FC = () => {
    const { store } = useContext(Context);
    const [teams, setTeams] = useState<ITeam[]>([]);
    const [olimps, setOlimps] = useState<IOlimp[]>([]);
    const [exercises, setExercises] = useState<IExercise[]>([]);
    const [answer1, setAnswer1] = useState<string>('')
    const [answer2, setAnswer2] = useState<string>('')
    const [answer3, setAnswer3] = useState<string>('')
    const [answer4, setAnswer4] = useState<string>('')
    

    async function ExitMemberDoOlimp() {
        store.member_do_olimp = false
    }

    async function getExerciseByOlimp() {
        try {
            const response = await ExerciseService.fetchExerciseByOlimp(store.olimp);
            setExercises(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    function AddCondition(theObject: string) {
        if (store.arr_conditions.length < 4)
        store.arr_conditions.push(theObject);
    }

    function AddAnswerAutor(theObject: string) {
        if (store.arr_autoranswers.length < 4)
        store.arr_autoranswers.push(theObject);
    }

    return (
        <div>
            <div className="profile_name">
                <p>{store.olimp}</p>
            </div>
            <br></br>
            <div>
                <button className="profile_button" onClick={getExerciseByOlimp}>Побачити завдання</button>
            </div>
            {
                exercises.map(exercise => 
                <div className="profile_name" key={exercise.name}>
                    Завдання:
                    <br></br>
                    {exercise.condition}
                    {AddCondition(exercise.condition)}
                    {AddAnswerAutor(exercise.answer)}
                    <br></br>
                </div>)
            }
            
            <p className="profile_name">{`1 Відповідь:`}</p>
            <input className="profile_input2"
                onChange={e => setAnswer1(e.target.value)}
                value={answer1}
                type="text"
            />

            <p className="profile_name">{`2 Відповідь:`}</p>
            <input className="profile_input2"
                onChange={e => setAnswer2(e.target.value)}
                value={answer2}
                type="text"
            />

            <p className="profile_name">{`3 Відповідь:`}</p>
            <input className="profile_input2"
                onChange={e => setAnswer3(e.target.value)}
                value={answer3}
                type="text"
            />

            <p className="profile_name">{`4 Відповідь:`}</p>
            <input className="profile_input2"
                onChange={e => setAnswer4(e.target.value)}
                value={answer4}
                type="text"
            />
            
            <br></br>   
            <br></br>
            <input className="profile_button" type="submit" value="Відправити відповіді" onClick={() => {store.registration_reply(store.user.email, store.olimp, store.arr_conditions, store.arr_autoranswers, [answer1 ,answer2, answer3, answer4], []); store.member_do_olimp = false; store.arr_autoranswers = []; store.arr_conditions = []}} />
            <br></br>
            <br></br>
            <input className="profile_button" type="submit" value="Вийти назад" onClick={ExitMemberDoOlimp} />
            <br></br>
            <br></br>
        </div>
    );
};

export default observer(MemberdoOlimp);