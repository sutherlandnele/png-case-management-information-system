import agencyTableMock from "./agencyTableMock";
import {REF_ROOT_PATH} from "../redux/agencyAPI";

//import MockUtils from "../../../../redux/__mocks__/mock.utils";

export default function mockAgency(mock) {

  mock.onGet(REF_ROOT_PATH).reply(() => {

    let agencies = agencyTableMock;

    if (!agencies) {
      return [400];
    }

    return [200, agencies];

  });



}
