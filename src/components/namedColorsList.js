import React from 'react';
import colors from 'color-name';
import cssColors from 'css-color-names';
import invert from 'invert-color';

export default function NamedColorsList(props) {
    return (
        <div>
            <h1>Named Colors</h1>
            <div className="named-colors-list">
                {Object.keys(colors).map(color => <div className="color-box" style={{backgroundColor: color, color: invert(cssColors[color], true)}}><h1>{color}</h1><h1>{cssColors[color]}</h1></div>)}
            </div>
        </div>
        
    );
}