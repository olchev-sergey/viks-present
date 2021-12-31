import {useState} from "react";

export const MovingRect = () => {
    const [pos, setPos] = useState({ x: 0, y: 0 })
    const [isEndingGame, setIsEndingGame] = useState(false)
    const [isEnd, setIsEnd] = useState(false)

    const width = 300
    const height = 300

    const padding = 40

    const rSide = 40

    const repeats = 40
    const [currentRepeats, setCurrentRepeats] = useState(0)

    const cornerCoord = {
        leftTop: { x: 0, y: 0 },
        leftBottom: { x: 0, y: height - rSide },
        rightTop: { x: width - rSide, y: 0 },
        rightBottom: { x: width - rSide, y: height - rSide },
    }

    const cornerCoordKeys = Object.keys(cornerCoord)
    const [nextCorner, setNextCorner] = useState(1)


    const moveTo = ({ x, y }) => {
        setPos({ x, y })
    }

    const moveToNextCorner = () => {
        moveTo(cornerCoord[cornerCoordKeys[nextCorner]])
        setNextCorner(nextCorner + 1)
        setCurrentRepeats(currentRepeats + 1)
        if (nextCorner > 2) {
            setNextCorner(0)
        }

        if (currentRepeats > repeats) {
            setIsEndingGame(true)
        }
    }

    const isIntersect = ({x, y }) => {
        return (x > pos.x - padding && x < pos.x + rSide + padding)
            && (y > pos.y - padding && y < pos.y + rSide + padding);
    }

    const isIntersectWithoutPadding = ({x, y }) => {
        return (x > pos.x && x < pos.x + rSide)
            && (y > pos.y && y < pos.y + rSide);
    }

    const handleMove = (e) => {
        const c = {
            x: e.clientX,
            y: e.clientY,
        }

        if (isEndingGame) {
            if (isIntersectWithoutPadding(c)) setIsEnd(true)
        } else {
            if (isIntersect(c)) moveToNextCorner()
        }
    }

    const codeLink = '01101000 01110100 01110100 01110000 01110011 00111010 00101111 00101111 01100100 01110010 01101001 01110110 01100101 00101110 01100111 01101111 01101111 01100111 01101100 01100101 00101110 01100011 01101111 01101101 00101111 01100110 01101001 01101100 01100101 00101111 01100100 00101111 00110001 00110001 01100110 01110100 01101111 01100110 00110001 01010101 01100101 01100010 01101010 01011000 01010000 01100010 01001100 01011001 01110110 01010001 01111001 01100011 01010100 01110010 00110101 01011111 01000011 01011111 01101010 01100100 01110110 01101000 01010001 01001110 00111000 00101111 01110110 01101001 01100101 01110111 00111111 01110101 01110011 01110000 00111101 01100100 01110010 01101001 01110110 01100101 01110011 01100100 01101011'


    return (
        <>
            <h1>Наведи курсор на квадрат</h1>
            {isEnd ? <div>
                <h3>Поздравляю, вы выйграли, вот ваш подарок</h3>
                <p>{codeLink}</p>
            </div>
            : <div style={{ width, height }} className="game-field" onMouseMove={handleMove}>
                    <div className="rect" style={{ top: pos.y, left: pos.x }}></div>
                </div>
            }

        </>
    )
}