import {Form} from "react-bootstrap";
import React from "react";
import {FormattedMessage, injectIntl} from "react-intl";

function App({labelIntlId, id, type, value, onChange, placeholderIntlId, intl, disabled, ...props}) {
  function renderLabel() {
    if (labelIntlId !== undefined) {
      return (
        <Form.Label>
          <FormattedMessage id={labelIntlId ? labelIntlId : ""} />
        </Form.Label>
      );
    }
  }

  return (
    <Form.Group controlId={id}>
      {renderLabel()}
      <Form.Control
        disabled={disabled}
        type={type}
        value={value === null ? "" : value}
        onChange={(e) => onChange(e.target.id, e.target.value, type)}
        placeholder={intl.formatMessage({id: placeholderIntlId})}
        {...props}
      />
    </Form.Group>
  );
}

export default injectIntl(App);