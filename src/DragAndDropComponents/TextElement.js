import React from 'react';
// to connect this component with store
import { connect } from 'react-redux';

class TextElement extends React.Component {
    render() {
        return (
            <div id="drag-text" draggable onDrag={(event) => this.props.onDrag(event ,this.props)}>
                <p>Hey Hi.! This is a simple Drag and Drop Component.</p>
                <p>Check it out by dragging me.!</p>
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
                    elementType : 'Text',
                    source : props.source ? props.source : null,
                    replaceId : props.replaceableId ? props.replaceableId : null
                }

               dispatch({type : 'UPDATE_DRAGGED_COMPONENT' , elementType: data})
           }
       }
   }
   
   
export default connect(mapStateToProps,mapDispatchToPros)(TextElement);
