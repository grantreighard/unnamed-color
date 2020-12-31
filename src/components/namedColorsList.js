import React, { useEffect, useState } from 'react';
import colors from 'color-name';
import cssColors from 'css-color-names';
import invert from 'invert-color';
import simpleColorConverter from 'simple-color-converter';

export default function NamedColorsList(props) {
    const rainbowSort = (array, type) => {
        return array.sort((a, b) => {
            const [rA, gA, bA] = colors[a];
            const aHSL = new simpleColorConverter({
                rgb: {r: rA, g: gA, b: bA},
                to: 'hsl'
            })

            const [rB, gB, bB] = colors[b];
            const bHSL = new simpleColorConverter({
                rgb: {r: rB, g: gB, b: bB},
                to: 'hsl'
            })

            if (type === "all") {
                if (aHSL.color.h === bHSL.color.h){
                    if (aHSL.color.s === bHSL.color.s) {
                        return +(aHSL.color.l < bHSL.color.l) || +(aHSL.color.l === bHSL.color.l) - 1;
                    }
    
                    return +(aHSL.color.s > bHSL.color.s) || +(aHSL.color.s === bHSL.color.s) - 1;
                }
                
                return +(aHSL.color.h > bHSL.color.h) || - 1;
            } else {
                const key = type[0];
                if (key === "l") {
                    return aHSL.color[key] < bHSL.color[key] ? 1 : -1;
                }

                return aHSL.color[key] > bHSL.color[key] ? 1 : -1;
            }
            
        })
    }

    const [sortBy, setSortBy] = useState("alphabetical");
    const [colorList, setColorList] = useState(Object.keys(colors));
    const [rainbowList] = useState(rainbowSort(Object.keys(colors), 'all'));
    const [hueList] = useState(rainbowSort(Object.keys(colors), 'hue'));
    const [saturationList] = useState(rainbowSort(Object.keys(colors), 'saturation'));
    const [lightnessList] = useState(rainbowSort(Object.keys(colors), 'lightness'));

    useEffect(() => {
        let newColorList;
        if (sortBy === "hue") {
            newColorList = hueList;
        } else if (sortBy === "saturation") {
            newColorList = saturationList;
        } else if (sortBy === "lightness") {
            newColorList = lightnessList;
        } else if (sortBy === "rainbow") {
            newColorList = rainbowList;
        } else {
            newColorList = Object.keys(colors);
        }

        setColorList(newColorList);
    }, [sortBy, rainbowList, hueList, saturationList, lightnessList])

    return (
        <div>
            <h1>Named Colors</h1>
            <p>Sort by: 
                <span className="not-a-link" onClick={() => setSortBy("alphabetical")}> alphabetical</span> |&nbsp; 
                <span className="not-a-link" onClick={() => setSortBy("hue")}>hue</span> |&nbsp;
                <span className="not-a-link" onClick={() => setSortBy("saturation")}>saturation</span> |&nbsp;
                <span className="not-a-link" onClick={() => setSortBy("lightness")}>lightness</span> |&nbsp;
                <span className="not-a-link" onClick={() => setSortBy("rainbow")}>rainbow</span>
            </p>
            <div className="named-colors-list">
                {colorList.length > 1 ? colorList.map(color => <div className="color-box" style={{backgroundColor: color, color: invert(cssColors[color], true)}}><h1>{color}</h1><h1>{cssColors[color]}</h1></div>) : []}
            </div>
        </div>
        
    );
}