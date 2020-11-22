import React, {useState} from 'react';
import colors from 'color-name';
import cssColors from 'css-color-names';
import randomHex from 'random-hex';
import nearestColor from 'nearest-color';
import namedColors from 'color-name-list';
import invert from 'invert-color';

export default function MakeAColor(props) {
    const [namedColorHexes] = useState(Object.keys(colors).map(color => cssColors[color]));
    const [randomColor, setRandomColor] = useState(randomHex.generate());

    const colorsReduced = namedColors.reduce((o, { name, hex }) => Object.assign(o, { [name]: hex }), {});
    const nearest = nearestColor.from(colorsReduced);

    const makeAnUnnamedColor = () => {
        const newRandomColor = randomHex.generate();
        if (!(namedColorHexes.includes(randomColor))) {
            setRandomColor(newRandomColor)
        } else {
            makeAnUnnamedColor();
        }
    }

    return (
        <div className="make-a-color">
            <h1>Random unnamed color</h1>
            <div className="color-box" style={{backgroundColor: randomColor, color: invert(randomColor, true)}}><h1>{randomColor}</h1><h1>{nearest(randomColor).name}</h1></div>
            <button onClick={makeAnUnnamedColor}>Generate random color</button>
        </div>
        
    )
}