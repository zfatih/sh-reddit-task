import React from 'react';
import FileSaver from 'file-saver';

import { Fab } from '@material-ui/core';
import { Save as SaveIcon } from '@material-ui/icons';

const SaveAsJson = (props) => {
    const { objectToSave, ...otherProps } = props;

    const saveToFile = () => {
        let blob = new Blob([JSON.stringify(objectToSave)], {
            type: `text/plain;charset=utf-8`,
        });
        FileSaver.saveAs(blob, `save_object.json`);
    };
    
    return (
        <Fab 
            color="primary" 
            aria-label="save"
            onClick={saveToFile}
            {...otherProps}
        >
            <SaveIcon />
        </Fab>
    );
}

export default SaveAsJson;