import { PonyObject } from '../common/interfaces';
import { setFields, booleanFields, colorFields } from '../common/compressPony';

import { sample, random } from 'lodash';

function randomBool(): boolean {
    return sample([true, false]) as boolean;
}

function randomColor(): string {
    return Math.random().toString(16).slice(2, 8);
}

export function randomizePony(pony: PonyObject) {
    const ponyInfo = pony.ponyInfo;

    if (ponyInfo) {
        booleanFields.forEach((field) => {
            (ponyInfo as any)[field.name] = randomBool();
        });

        colorFields.forEach((field) => {
            (ponyInfo as any)[field.name] = randomColor();
        });

        setFields.forEach((field) => {
            const infoField = (ponyInfo as any)[field.name];

            infoField.type = random(0, field.sets.length - 1);
            for (let i = 0; i < infoField.fills.length; i++) {
                infoField.fills[i] = randomColor();
                const lock = randomBool();

                infoField.lockFills[i] = false;
                infoField.lockOutlines[i] = lock;
                if (!lock) {
                    infoField.outlines[i] = randomColor();
                }
            }
        });
    }
};