import { extractNodeIdAndValue, findVariableByNodeId } from './variableUtils';

// Definire i numeri delle zone come costanti
export const ZoneNumber = {
    ZONE1: 1,
    ZONE2: 2,
    ZONE3: 3,
    ZONE4: 4,
    ZONE5: 5,
    ZONE6: 6,
    ZONE7: 7,
    ZONE8: 8,
    ZONE9: 9,
    ZONE10: 10,
    ZONE11: 11,
    ZONE12: 12,
    ZONE13: 13,
    ZONE14: 14,
};

export const getThermoDataCard = (variables, imagePaths, zoneNr) => {
    const zoneCards = [];
    for (let i = 1; i <= zoneNr; i++) {
        
        const zoneName = `Zone ${i}`;
        const zoneSp = extractNodeIdAndValue(findVariableByNodeId(variables, `machine_current.zone_sp[${i}]`)).value;
        const zoneReal = extractNodeIdAndValue(findVariableByNodeId(variables, `ZoneMngControl[${i}].ZoneReal`)).value;
        //zoneSp, zoneReal,
        zoneCards.push({ zoneName,zoneSp,zoneReal, zoneIndex: i });
    }
    return zoneCards;
};
