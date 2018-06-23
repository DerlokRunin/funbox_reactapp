import React, {Component} from 'react';
import PropTypes from "prop-types";
import { Icon } from 'react-icons-kit'
import {bin} from 'react-icons-kit/icomoon/bin'
import {ic_import_export} from 'react-icons-kit/md/ic_import_export'

import './Path.css'

class Path extends Component{

    static propTypes = {
        point: PropTypes.shape({ //точкa с координатами
            id: PropTypes.number.isRequired,
            title: PropTypes.string,
            coordinates: PropTypes.array,
        }),
        onDelete: PropTypes.func,//действия при нажатии на кнопку удаления
    };


    render(){
        const {point, onDelete} = this.props;
        return (
            <div>
                <div className="path__point">
                    <Icon size={16} icon={ic_import_export} />
                    <span>{point.title}</span>
                    <button className="float-right path__button" onClick={onDelete}><Icon size={16} icon={bin} /></button>
                </div>
            </div>
        )
    }
}


export default Path;