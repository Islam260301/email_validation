import React, {useState, useRef} from 'react';
import axios from "axios";
import EmailAutoComplete from 'react-autocomplete-email';


function App() {
    const [inputVal, setInputVal] = useState('')
    const [isLoad, setIsLoad] = useState(false)
    const [result, setResult] = useState('')

    const emailAutoCompleteRef = useRef()
    const customDomains = [
        "gmail.com",
        "hotmail.com",
        "mail.com",
        "ukr.net",
        "mail.ru",
        "yahoo.com",
    ]

    const onCheckEmailHandler = async () => {
        setIsLoad(true)
        let reqData = {
            access_key: '6afe252175c522096b038fa3c73f24c2',
            email: inputVal,
            smtp: 1,
            format: 1
        }
        const res = await axios.get('http://apilayer.net/api/check', {params: reqData})
        setIsLoad(false)
        if(res.data.smtp_check) {
            setResult("Данная почта существует!")
        }else {
            setResult("Данная почта НЕ существует!")
        }
    }

    return (
        <div>
            {isLoad ? <h1>Loading...</h1> : <div>
                    <div>
                        <EmailAutoComplete
                            ref={emailAutoCompleteRef}
                            onCompletion={val => setInputVal(val)}
                            domains={customDomains}>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email..."
                                value={inputVal}
                                onChange={(e) => setInputVal(e.target.value)}
                                onKeyDown={(e) => emailAutoCompleteRef.current.check(e)} />
                        </EmailAutoComplete>
                    </div>
                <button onClick={() => onCheckEmailHandler()}>Check</button>
                <h4>{result}</h4>
            </div>}
        </div>

    )
}

export default App;
