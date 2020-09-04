import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextFieldElement from './TextFieldElement';
import ButtonElement from './ButtonElement';
import TextElement from './TextElement';

class DragComponents extends React.Component {

    onDrag(event) {
        event.preventDefault();
    }

    render() {
        return (
            <div className="DragDropContainer">
                <Grid container>
                    <Grid item xs={12} className="DragDropCustomElements">
                        <TextFieldElement/>
                    </Grid>
                    <Grid item xs={12} className="DragDropCustomElements">
                        <ButtonElement/>
                    </Grid>
                    <Grid item xs={12} className="DragDropCustomElements">
                        <TextElement/>
                    </Grid>
                </Grid>
            </div>
        )
    }
}


export default DragComponents;