import React, { FC, useContext, useState } from 'react';
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import { ITeam } from "../models/ITeam"
import TeamService from "../services/TeamService";

const MemberForm: FC = () => {
    const { store } = useContext(Context);
    const [teams, setTeams] = useState<ITeam[]>([]);

    async function LookOlimp() {
        store.look_olimp_member = true
    }

    async function getTeamsByMember() {
        try {
            const response = await TeamService.fetchUsersMember(store.user.email);
            setTeams(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div>
            <div className="profile_name" >
                <p>{`Им’я: ${store.user.name}`}</p>
                <p>{`Навчальний заклад: ${store.user.educational}`}</p>
                <p>{`Пошта: ${store.user.email}`}</p>
            </div>

            <div className="profile_name1" >
                <p>{`Подивитися команди, в яких Ви перебуваєте:`}</p>
            </div>
            <div>
                <button className="profile_button" onClick={getTeamsByMember}>Подивитися</button>
            </div>
            {teams.map(team => <div className="profile_name" key={team.name}> {team.name} <br></br> Тренер: {team.trainer}<br></br> Учасники: {team.members} </div>)}

            <div className="profile_name1" >
                <p>{`Олімпіади в яких Ви берете участь:`}</p>
            </div>
            <input className="profile_button" type="submit" value="Подивитися" onClick={LookOlimp}/><br></br><br></br>
            <button className="profile_button" onClick={() => store.logout()}>Вийти</button>
        </div>
    );
};

export default observer(MemberForm);