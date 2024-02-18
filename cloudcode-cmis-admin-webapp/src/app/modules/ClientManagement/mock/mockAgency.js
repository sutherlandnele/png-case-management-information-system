import agencyTableMock from "./agencyTableMock";
import { AGENCY_URL} from "../redux/agencyAPI";

export default function mockAgency(mock) {

  mock.onGet(AGENCY_URL).reply(() => {
    let allAgencies = agencyTableMock;   
    if (!allAgencies) {
      return [404];
    }
    return [200, allAgencies];
  });

}
