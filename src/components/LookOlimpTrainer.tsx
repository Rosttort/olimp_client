import React, { FC, useContext, useState } from 'react';
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import TeamService from "../services/TeamService";
import OlimpService from "../services/OlimpService";
import { ITeam } from "../models/ITeam"
import { IOlimp } from "../models/IOlimp"
import Moment from 'moment';

const LookOlimpMember: FC = () => {
    const { store } = useContext(Context);
    const [teams, setTeams] = useState<ITeam[]>([]);
    const [olimps, setOlimps] = useState<IOlimp[]>([]);
    const [team, setTeam] = useState<string>('')

    async function ExitLookOlimp() {
        store.look_olimp_trainer = false
    }

    async function getTeamsByTrainer() {
        try {
            const response = await TeamService.fetchUsersTrainer(store.user.email);
            setTeams(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    async function getOlimpByTeam(team: string) {
        try {
            const response = await OlimpService.getOlympByTeam(team);
            setOlimps(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div>
            <br></br>
            <div>
                <button className="profile_button" onClick={getTeamsByTrainer}>Подивитись команди</button>
            </div>
            {teams.map(team => <div className="profile_name" key={team.name}> {team.name} <br></br></div>)}
            <br></br>
            <input 
                className= "profile_input"
                onChange={e => setTeam(e.target.value)}
                value={team}
                type="text"
                placeholder='назва команди'
            />
            <br></br><br></br>
            <div>
                <button className="profile_button" onClick={() => getOlimpByTeam(team)}>Олімпіади</button>
            </div>
            {olimps.map(olimp => <div className="profile_name" key={olimp.name}> 
            {olimp.name}<br></br>
            Дисципліна: {olimp.subject}<br></br>
            Початок: {Moment(olimp.first_date).format('MMMM Do YYYY, h:mm a')}<br></br>
            Кінець: {Moment(olimp.last_date).format('MMMM Do YYYY, h:mm a')}<br></br>
            </div>)}
            <br></br>            <br></br>
            <input type="submit" className="profile_button" value="Вийти назад" onClick={ExitLookOlimp} />
        </div>
    );
};

export default observer(LookOlimpMember);