import React from 'react';
import TextField from '@material-ui/core/TextField';

import { connect } from 'react-redux';

class TextFieldElement extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (    
            <div>
                <TextField draggable label="Drag Me" variant="outlined" onDrag={(event) => this.props.onDrag(event , this.props)}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
 return {
    currentlyDragComponent : state.currentlyDragComponent
 }
}
const mapDispatchToPros = (dispatch) => {
    return {
        onDrag: (event , props) => {
            event.preventDefault();
            let data = {
                elementType : 'TextField',
                source : props.source ? props.source : null,
                replaceId : props.replaceableId ? props.replaceableId : null
            }
            dispatch({type : 'UPDATE_DRAGGED_COMPONENT' , elementType : data})
        }
    }
}


export default connect(mapStateToProps,mapDispatchToPros)(TextFieldElement);
