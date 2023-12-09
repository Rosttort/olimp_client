import React, {FC, useContext, useState} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const RegForm: FC = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [role, setRole] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [educational, setEducational] = useState<string>('')
    const {store} = useContext(Context);

    async function Log() {
        store.reg = false
    }

    return (

        <div className='box'>
            <input
                onChange={e => setEmail(e.target.value)}
                value={email}
                type="text"
                placeholder='Email'
            />
            <input
                onChange={e => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder='Пароль'
            />
            <input
                onChange={e => setName(e.target.value)}
                value={name}
                type="text"
                placeholder='Им’я'
            />
            <input
                onChange={e => setEducational(e.target.value)}
                value={educational}
                type="text"
                placeholder='Навчальний заклад'
            />
            <input type="submit" value="Реєстрація" onClick={() => {
                store.registration(email, password, 'member' , name, educational);
                store.login(email, password)}} />
            <input type="submit" value="Акаунт вже є" onClick={Log} />
        </div>
    );
};

export default observer(RegForm);