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
        alert('error getMotorDataCard',error)
    }
   
};


export const getMotorDataModal = (variables, motorType) => {
    switch (motorType) {
        case MotorTypes.EXT:
            return [
                { nodeId: 'ext_sp_rpm', label: 'Speed Setpoint', value: extractNodeIdAndValue(findVariableByNodeId(variables ,'ext_sp_rpm')).value},
                { nodeId: 'machine_current.amps_ext_AL1_sp', label: 'Amps Lowload Setpoint', value: extractNodeIdAndValue(findVariableByNodeId(variables, 'machine_current.amps_ext_AL1_sp')).value },
                { nodeId: 'machine_current.amps_ext_AL2_sp', label: 'Amps Highload Setpoint', value: extractNodeIdAndValue(findVariableByNodeId(variables, 'machine_current.amps_ext_AL2_sp')).value },
                { nodeId: 'machine_current.bar_screen_al1_sp', label: 'Pressure Warning Setpoint', value: extractNodeIdAndValue(findVariableByNodeId(variables, 'machine_current.bar_screen_al1_sp')).value },
                { nodeId: 'machine_current.bar_screen_al2_sp', label: 'Pressure Alarm Setpoint', value: extractNodeIdAndValue(findVariableByNodeId(variables, 'machine_current.bar_screen_al2_sp')).value },
            ];
            case MotorTypes.DICER:
            return [
                { nodeId: 'dicer_sp', label: 'Speed Setpoint', value: extractNodeIdAndValue(findVariableByNodeId(variables , 'dicer_sp')).value },
                { nodeId: 'machine_current.dicer_scale_bar_hi', label: 'Scaling - Setpoint Pressure High', value: extractNodeIdAndValue(findVariableByNodeId(variables , 'machine_current.dicer_scale_bar_hi')).value },
                { nodeId: 'machine_current.dicer_scale_bar_lo', label: 'Scaling - Setpoint Pressure Low', value: extractNodeIdAndValue(findVariableByNodeId(variables , 'machine_current.dicer_scale_bar_lo')).value },
                { nodeId: 'machine_current.dicer_scale_hz_hi', label: 'Scaling - Setpoint Speed High', value: extractNodeIdAndValue(findVariableByNodeId(variables , 'machine_current.dicer_scale_hz_hi')).value },
                { nodeId: 'machine_current.dicer_scale_hz_low', label: 'Scaling - Setpoint Speed Low', value: extractNodeIdAndValue(findVariableByNodeId(variables , 'machine_current.dicer_scale_hz_low')).value },
            ];
            case MotorTypes.ROLLFEED:
            return [
                { nodeId: 'machine_current.rollfeed_sp', label: 'Speed Setpoint', value: extractNodeIdAndValue(findVariableByNodeId(variables , 'machine_current.rollfeed_sp')).value },
            ];
        default:
            return [];

    }
};


