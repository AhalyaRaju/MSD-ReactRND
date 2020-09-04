import React from 'react';
import Button from '@material-ui/core/Button';
// to connect this component with store
import { connect } from 'react-redux';


class ButtonElement extends React.Component {
    render() {
        return (
            <Button draggable variant="contained" color="primary" onDrag={(event) => this.props.onDrag(event , this.props)}>
                Drag Me
            </Button>
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
                elementType : 'Button',
                source : props.source ? props.source : null,
                replaceId : props.replaceableId ? props.replaceableId : null
            }
            dispatch({type : 'UPDATE_DRAGGED_COMPONENT' , elementType : data})
        }
    }
}
   
   
export default connect(mapStateToProps,mapDispatchToPros)(ButtonElement);

