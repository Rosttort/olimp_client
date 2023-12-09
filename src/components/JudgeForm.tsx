    import React, { FC, useContext, useState } from 'react';
    import { Context } from "../index";
    import { observer } from "mobx-react-lite";
    import OlimpService from "../services/OlimpService";
    import Moment from 'moment';
    import { IOlimp } from "../models/IOlimp"

    const JudgeForm: FC = () => {
        const { store } = useContext(Context);
        const [olimps, setOlimps] = useState<IOlimp[]>([]);

        async function getOlimpByJudge(judge: string) {
            try {
                const response = await OlimpService.getOlimpByJudge(judge);
                setOlimps(response.data);
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
                <br></br>
                <div>
                    <button className="profile_button" onClick={() => getOlimpByJudge(store.user.email)}>Олімпіади</button>
                </div>
                {olimps.map(olimp => <div className="profile_name" key={olimp.name}> 
                {olimp.name}<br></br>
                Дисципліна: {olimp.subject}<br></br><br></br>
                <button className="profile_button" onClick={() => {
                    store.olimp = olimp.name;
                    store.judge_check_olimp = true;
                }}>Перевірити олімпіаду</button>
                </div>)}
                <br></br>
                <br></br>
                <button className="profile_button" onClick={() => store.logout()}>Вийти</button>
            </div>
        );
    };

    export default observer(JudgeForm);