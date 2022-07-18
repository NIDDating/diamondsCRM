import {Form} from "react-bootstrap";
import {FormattedMessage} from "react-intl";
import React from "react";
import Input from "../Input";

function App({labelIntlId, id1, id2, type1, type2, value1, value2, onChange, placeholderIntlId1, placeholderIntlId2}) {
  return (
    <div className="doubleGroup">
      <Form.Label>
        <FormattedMessage id={labelIntlId} />
      </Form.Label>
      <div className="double">
        <Input
          id={id1}
          value={value1}
          type={type1}
          onChange={onChange}
          placeholderIntlId={placeholderIntlId1}
        />
        <Input
          id={id2}
          value={value2}
          type={type2}
          onChange={onChange}
          placeholderIntlId={placeholderIntlId2}
        />
      </div>
    </div>
  );
}

export default App;