import {useState} from "react";
import {MovingRect} from "./MovingRect";

export const MainView = () => {
    const [isStart, setIsStart] = useState(false)
    const [showOkBtn, setShowOkBtn] = useState(false)
    const [startGame, setStartGame] = useState(false)

    const text = 'Предлагаю вам, Виктория, принять участие в этой игре для получения незабываемого подарка'
    // const text = 'gldfdf'

    const [currentText, setCurrentText] = useState('')

    const startWriteText = () => {
        let i = 1;

        const promise = new Promise((res) => {
            const idI = setInterval(() => {
                setCurrentText(text.slice(0, i))
                i += 1

                if (i === text.length) {
                    clearInterval(idI)
                    res()
                }
            }, 100)
        })

        promise.then(() => {
            setShowOkBtn(true)
        })
    }

    return (
        <div className="main-view">
            {startGame ? <MovingRect/> :

                <><h1 className="title">Добро пожаловать в занимательные игры</h1>
            {isStart
                ? <>
                <div style={{paddingBottom: '20px'}}>{currentText}</div>
                </>
                : <button
                onClick={() => {
                setIsStart(true)
                startWriteText()
            }}
                className="button"
                >
                начать
                </button>
            }
            {showOkBtn && <div>
                <button onClick={() => setStartGame(true)} className="button" >Да</button>
                <button onClick={() => setStartGame(true)} className="button">Конечно да</button>
                </div>


            } </>}
        </div>
    )
}