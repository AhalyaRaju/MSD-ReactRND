import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import { connect } from 'react-redux';

// drag and drop elements
import TextFieldElement from './TextFieldElement';
import ButtonElement from './ButtonElement';
import TextElement from './TextElement';

class DropComponents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dragAndDropData : {
                elementsDroppedOrderStatic : [],
                elementsDroppedOrderAbsolute : [],
                elementsDroppedOrderStaticLast : [],
            },
            currentElementX : 0, // currently dragged element's x position
            currentElementY : 0 // currently dragged element's y position
        };
    }

    // called when the elements are dragged over the droppable container
    onDragOver = (event) =>{
        this.setState({currentElementX : event.clientX ,currentElementY : event.clientY }) // x and y positions of the element
        event.preventDefault();
    }

    // filter the data 
    getFilteredData = (currentArray , replaceId) => {
        let components = currentArray.filter(function (e) {
            return e.elementType !== replaceId;
        });
        return components;
    }
    
    // when the event is dropped over the droppable container
    onDrop = (event , dropSource) => {
        event.preventDefault();
        
        let currentDroppedElement = this.props.currentlyDragComponent.elementType ; //currently dropped element (TextField/ Button / Text)
        let dragSource = this.props.currentlyDragComponent.source; // source from where the component is dragged (either a new component or existing component)


        let afterDragData = {...this.state.dragAndDropData} // backup of current state

        let dropData = {}

        // If there is a drag source, (i.e, the component is dragged within the draggable container)
        if(dragSource) {
            let replaceId = this.props.currentlyDragComponent.replaceId; // if the components are dragged inside a drop box, the id of dragged element

            // remove the currently dragged one and add it in the particular position
            switch(dragSource) {
                case "static" :
                    let staticComponents = this.getFilteredData(afterDragData.elementsDroppedOrderStatic , replaceId);
                    afterDragData['elementsDroppedOrderStatic'] = staticComponents;
                    break;
                case "absolute" :
                    let absoluteComponents = this.getFilteredData(afterDragData.elementsDroppedOrderAbsolute , replaceId);
                    afterDragData['elementsDroppedOrderAbsolute'] = absoluteComponents;
                    break;
                default:
                    let static2Components = this.getFilteredData(afterDragData.elementsDroppedOrderStaticLast , replaceId);
                    afterDragData['elementsDroppedOrderStaticLast'] = static2Components;
                    break;
            }

            this.setState({
                dragAndDropData : afterDragData
            })

            dropData = {
                ...afterDragData
            }
    
        }
        else {
            // after the dragged element is removed from the dragged component,
            dropData = {
                ...this.state.dragAndDropData
            }
        }
        
        // new elements initial data
        let pushObj = {
            left : this.state.currentElementX,
            top : this.state.currentElementY,
            elementType : currentDroppedElement === 'TextField' ? 1 : currentDroppedElement === 'Button' ?  2 : 3
        }
        let elementsDroppedOrder = [pushObj]; 
    

        // to push the dragged components inside the particular target 
            switch (dropSource) {
                case "static":
                    elementsDroppedOrder = dragSource ? 
                        afterDragData['elementsDroppedOrderStatic'].concat(elementsDroppedOrder) : 
                        this.state.dragAndDropData.elementsDroppedOrderStatic.concat(elementsDroppedOrder);
                    dropData['elementsDroppedOrderStatic'] = elementsDroppedOrder;
                break;
                case "absolute" :
                    elementsDroppedOrder = dragSource ? afterDragData['elementsDroppedOrderAbsolute'].concat(elementsDroppedOrder) :  this.state.dragAndDropData.elementsDroppedOrderAbsolute.concat(elementsDroppedOrder);
                    dropData['elementsDroppedOrderAbsolute'] = elementsDroppedOrder;
                break;
                default:
                    elementsDroppedOrder = dragSource ? afterDragData['elementsDroppedOrderStaticLast'].concat(elementsDroppedOrder) :  this.state.dragAndDropData.elementsDroppedOrderStaticLast.concat(elementsDroppedOrder);
                    dropData['elementsDroppedOrderStaticLast'] = elementsDroppedOrder;
                break;
            }
    
            this.setState({dragAndDropData : dropData})        
    }

    // dragged components positions are saved (in local storage)
    saveDragAndDrop = () => {
        localStorage.setItem('DragAndDropOrder',JSON.stringify(this.state));
    }

    // clear the saved positions
    clear =() => {
        localStorage.removeItem('DragAndDropOrder')
        this.setState({dragAndDropData : {
            elementsDroppedOrderStatic : [],
            elementsDroppedOrderAbsolute : [],
            elementsDroppedOrderStaticLast : [],
        }})
    }

    // reset the last changes of the drag and drop
    resetDragAndDrop = () => {
        if(JSON.parse(localStorage.getItem('DragAndDropOrder')))
            this.setState(JSON.parse(localStorage.getItem('DragAndDropOrder')))
        else 
            this.setState({dragAndDropData : {
                elementsDroppedOrderStatic : [],
                elementsDroppedOrderAbsolute : [],
                elementsDroppedOrderStaticLast : [],
            }})
    }


    // take the local storage and preview the components 
    componentDidMount= () => {
        if(JSON.parse(localStorage.getItem('DragAndDropOrder')))
            this.setState(JSON.parse(localStorage.getItem('DragAndDropOrder')))
        else
            localStorage.setItem('DragAndDropOrder',JSON.stringify(this.state));
    }



    render() {
        return (
            <div>
                <div className="DragDropContainer">
                    <div className="DropContainer">
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            Absolute Positioning
                            <div className="DropContainerMain" onDrop={event => this.onDrop(event , 'absolute')} onDragOver={(event => this.onDragOver(event))}>
                                    {this.state.dragAndDropData.elementsDroppedOrderAbsolute.length ? 
                                        this.state.dragAndDropData.elementsDroppedOrderAbsolute.map((absolutePos , index) => (
                                            <div key={index} className="DraggedComponentsAbsolute" style={{left : absolutePos.left+'px' , top : absolutePos.top+'px' }}>
                                                {absolutePos.elementType === 1 ? 
                                                    <TextFieldElement source="absolute" replaceableId={absolutePos.elementType}></TextFieldElement> : 
                                                    absolutePos.elementType === 2 ? 
                                                    <ButtonElement source="absolute" replaceableId={absolutePos.elementType}></ButtonElement> : 
                                                    <TextElement source="absolute" replaceableId={absolutePos.elementType}></TextElement>
                                                }
                                            </div>
                                        ))
                                    :null}                                    
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            Static Positioning
                            <div className="DropContainerSub" onDrop={event => this.onDrop(event , 'static')} onDragOver={(event => this.onDragOver(event))}>
                                    {this.state.dragAndDropData.elementsDroppedOrderStatic.length ? 
                                            this.state.dragAndDropData.elementsDroppedOrderStatic.map((staticPos, index) => ( 
                                                <div key={index} className="DraggedComponents">
                                                    {staticPos.elementType === 1 ? 
                                                        <TextFieldElement source="static" replaceableId={staticPos.elementType}></TextFieldElement> : 
                                                        staticPos.elementType === 2 ? 
                                                        <ButtonElement source="static" replaceableId={staticPos.elementType}></ButtonElement> : 
                                                        <TextElement source="static" replaceableId={staticPos.elementType}></TextElement>
                                                    }
                                                </div>
                                            ))  
                                    :null}                                    
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                        Static Positioning
                            <div className="DropContainerSub" onDrop={event => this.onDrop(event , 'static2')} onDragOver={(event => this.onDragOver(event))}>
                                {this.state.dragAndDropData.elementsDroppedOrderStaticLast.length ? 
                                    this.state.dragAndDropData.elementsDroppedOrderStaticLast.map((staticPos2 ,  index) => (
                                        <div key={index} className="DraggedComponents">
                                            {staticPos2.elementType === 1 ? 
                                                <TextFieldElement source="static2" replaceableId={staticPos2.elementType}></TextFieldElement> : 
                                                staticPos2.elementType === 2 ? 
                                                <ButtonElement source="static2" replaceableId={staticPos2.elementType}></ButtonElement> : 
                                                <TextElement source="static2" replaceableId={staticPos2.elementType}></TextElement>
                                            }
                                        </div>
                                    ))
                                :null}
                            </div>
                        </Grid>
                </Grid>
                    </div>
                </div>
                <div className="DrapDropContainerActionsMain">
                    <Button id="save-drag-dop" className="DrapDropContainerActions" variant="contained" color="primary" onClick={() => this.saveDragAndDrop()}>
                        Save
                    </Button>
                    <Button id="reset-drag-dop" className="DrapDropContainerActions" variant="contained" color="primary" onClick={() => this.resetDragAndDrop()}>
                        Reset
                    </Button>
                    <Button id="cancel-drag-drop" variant="contained" color="secondary" onClick={() => this.clear()}>
                        Clear
                    </Button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
 return {
    currentlyDragComponent : state.currentlyDragComponent
 }
}


export default connect(mapStateToProps)(DropComponents);
