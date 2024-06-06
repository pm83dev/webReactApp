//motorUtils.js

import {extractNodeIdAndValue, findVariableByNodeId } from './variableUtils';

export const MotorTypes = {
    EXT: 0,
    DICER: 1,
    ROLLFEED: 2,
    AUGER: 3,
    SHREDDER: 4
};

export const getMotorDataCard = (variables, imagePaths, enableRollfeed, enableAuger, enableShredder) => {
    try {

        const motorData = [
            {
                idxMotor: MotorTypes.EXT,
                sp: extractNodeIdAndValue(findVariableByNodeId(variables, 'ext_sp_rpm')).value,
                pv: extractNodeIdAndValue(findVariableByNodeId(variables, 'ext_RPM_scaled')).value,
                current: extractNodeIdAndValue(findVariableByNodeId(variables, 'screen_amps')).value,
                imagePath: imagePaths.ext
            },
            {
                idxMotor: MotorTypes.DICER,
                sp: extractNodeIdAndValue(findVariableByNodeId(variables, 'dicer_sp')).value,
                pv: extractNodeIdAndValue(findVariableByNodeId(variables, 'dicer_sp')).value,
                current: extractNodeIdAndValue(findVariableByNodeId(variables, 'Dicer_IO.ActualCurrent')).value,
                imagePath: imagePaths.dicer
            }
        ];
    
        if (enableRollfeed) {
            motorData.push({
                idxMotor: MotorTypes.ROLLFEED,
                sp: extractNodeIdAndValue(findVariableByNodeId(variables, 'machine_current.rollfeed_sp')).value,
                pv: extractNodeIdAndValue(findVariableByNodeId(variables, 'Rollfeed_sp_scaled')).value,
                current: extractNodeIdAndValue(findVariableByNodeId(variables, 'Rollfeed_IO.ActualCurrent')).value,
                imagePath: imagePaths.rollfeed
            });
        }
        if (enableAuger) {
            motorData.push({
                idxMotor: MotorTypes.AUGER,
                sp: extractNodeIdAndValue(findVariableByNodeId(variables, 'machine_current.auger_sp')).value,
                pv: extractNodeIdAndValue(findVariableByNodeId(variables, 'auger_sp_scaled')).value,
                current: extractNodeIdAndValue(findVariableByNodeId(variables, 'Auger_IO.ActualCurrent')).value,
                imagePath: imagePaths.auger
            });
        }
        if (enableShredder) {
            motorData.push({
                idxMotor: MotorTypes.SHREDDER,
                sp: extractNodeIdAndValue(findVariableByNodeId(variables, 'shredder_speed_rpm_real')).value,
                pv: extractNodeIdAndValue(findVariableByNodeId(variables, 'shredder_actual_speed')).value,
                current: extractNodeIdAndValue(findVariableByNodeId(variables, 'Shredder_IO.ActualCurrent')).value,
                imagePath: imagePaths.shredder
            });
        }
    
        return motorData;
        
    } catch (error) {
        alert('error getMotorDataCard')
    }
   
};


