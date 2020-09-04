import React from 'react';
import Grid from '@material-ui/core/Grid';
import DragComponents from './DragComponents';
import DropComponents from "./DropComponents";
import './DragAndDropContainer.css';



class DragAndDropContainer extends React.Component {
    render() {
        return (
                <div>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <DropComponents></DropComponents>
                        </Grid>
                        <Grid item xs={6}>
                            <DragComponents></DragComponents>
                        </Grid>
                    </Grid>
                </div>
        )
    }
}

export default DragAndDropContainer;