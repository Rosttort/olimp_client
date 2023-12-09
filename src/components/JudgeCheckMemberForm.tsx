import React, { FC, useContext, useState } from 'react';
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import ReplyService from "../services/ReplyService";
import Moment from 'moment';
import { IReply } from "../models/IReply"

const JudgeCheckMemberForm: FC = () => {
    const { store } = useContext(Context);
    const [replys, setReplys] = useState<IReply[]>([]);
    const [mark1, setMark1] = useState<string>('')
    const [mark2, setMark2] = useState<string>('')
    const [mark3, setMark3] = useState<string>('')
    const [mark4, setMark4] = useState<string>('')

    async function getReplyByOlimpMember(olimp: string, member: string) {
        try {
            const response = await ReplyService.getReplyByOlimpMember(olimp, member);
            setReplys(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div>
            <div className="profile_name">
                <p>{store.olimp}</p>
            </div>
            <br></br>   
            <div>
                <button className="profile_button" onClick={() => getReplyByOlimpMember(store.olimp, store.member)}>Перевірити</button>
            </div>
            {replys.map(reply => 
            <div className="profile_name" key={reply.member}> 
                Умови:<br></br>
                {reply.conditions}<br></br>
                Відповіді автора:<br></br>
                {reply.author_answers}<br></br>
                Відповіді учасника:<br></br>
                {reply.answers}<br></br>
                Оцініть відповіді учасника в процентах:
            </div>)}

            <p className="profile_name">{`1 Відповідь:`}</p>
            <input className="profile_input"
                onChange={e => setMark1(e.target.value)}
                value={mark1}
                type="text"
            />

            <p className="profile_name">{`2 Відповідь:`}</p>
            <input className="profile_input"
                onChange={e => setMark2(e.target.value)}
                value={mark2}
                type="text"
            />

            <p className="profile_name">{`3 Відповідь:`}</p>
            <input className="profile_input"
                onChange={e => setMark3(e.target.value)}
                value={mark3}
                type="text"
            />

            <p className="profile_name">{`4 Відповідь:`}</p>
            <input className="profile_input"
                onChange={e => setMark4(e.target.value)}
                value={mark4}
                type="text"
            />

            <br></br>
            <br></br>
            <button className="profile_button" onClick={() => 
                {store.addMarkOnReply(mark1, store.olimp, store.member);
                    store.addMarkOnReply(mark2, store.olimp, store.member);
                    store.addMarkOnReply(mark3, store.olimp, store.member);
                    store.addMarkOnReply(mark4, store.olimp, store.member);
                    store.checkReply(store.olimp, store.member);
                    store.judge_check_member = false; store.i = 0
                }
                }>Відправити</button>
            <br></br>
            <br></br>
            <button className="profile_button" onClick={() => { store.judge_check_member = false; store.i = 0}}>Вийти</button>
        </div>
    );
};

export default observer(JudgeCheckMemberForm);