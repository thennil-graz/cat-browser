import React from 'react';
import { Spinner } from 'react-bootstrap';


function Loader() {
    return (<><Spinner id="loader" as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
        Loading results...
    </>
    );
}

export default Loader;