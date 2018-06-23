import React, {Component} from 'react';
import PropTypes from "prop-types";
import './PathList.css';
import Path from './Path/Path';

class PathList extends Component{

    static propTypes = {
        points: PropTypes.array,//точки с координатами
        onDelete: PropTypes.func,//действия при удалении
        onRevertPoints: PropTypes.func,//действия при перемещении
    };

    constructor(props){
        super(props);


        //Пустышка drag and drop
        this.placeholder = document.createElement("li");
        this.placeholder.className = "placeholder";
    }

    render(){

        const {points, onDelete} = this.props;
        const pathElements = points.map((point, index) =>
            <li
                dataset_id={index}
                key={point.id}
                draggable='true'
                onDragEnd={this.dragEnd}
                onDragStart={this.dragStart}
            >
                <Path point={point} onDelete={onDelete.bind(this, point.id)}/>
            </li>
        );

        return (
            <div>
                <ul className="pathlist__ul" onDragOver={this.dragOver}>
                    {pathElements}
                </ul>
            </div>
        )
    }

    //начало перемещения
    dragStart = (event) => {
        this.dragged = event.currentTarget;
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('text/html', this.dragged);
    };
    //окончание перемещения
    dragEnd = (event) => {
        this.dragged.style.display = 'block';
        try {
            this.dragged.parentNode.removeChild(this.placeholder);
        }catch(e){}

        // меняем местами данные
        const {onRevertPoints} = this.props;
        var from = Number(this.dragged.getAttribute('dataset_id'));
        var to = Number(this.over.getAttribute('dataset_id'));
        onRevertPoints(to, from);
    };
    //наведение
    dragOver = (event) => {
        event.preventDefault();
        this.dragged.style.display = "none";
        if(event.target.className === 'path__point') {
            this.over = event.target.parentNode.parentNode;
            this.before = !this.before;
            if(this.before)
                this.over.parentNode.insertBefore(this.placeholder, this.over);
            else
                this.over.parentNode.insertBefore(this.placeholder, this.over.nextSibling);
        }else
        if(event.target.className === 'placeholder') return;


    };
}

export default PathList;