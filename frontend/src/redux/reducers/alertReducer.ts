import { IAlert } from "../../utils/TypeScript";
import { ALERT, IAlertType } from "../types/alertType";


const authReducer = (state: IAlert = {}, action: IAlertType): IAlert => {
    switch (action.type) {
        case ALERT:
            return action.payload
        default:
            return state;
    }
}

export default authReducer