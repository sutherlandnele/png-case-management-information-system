import reference from "./referenceTableMock";
//import MockUtils from "../../../../redux/__mocks__/mock.utils";

export default function mockReference(mock) {


  mock.onGet(/api\/reference\/\d+/).reply(config => {

    const kindId = config.url.match(/api\/reference\/(\d+)/)[1];

    const filterRef = reference.filter(el => el.kind_id === +kindId);

    if (!filterRef) {
      return [400];
    }

    return [200, filterRef];
  });

}
