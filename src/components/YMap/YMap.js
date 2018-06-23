import React, { Component } from 'react';
import PropTypes from "prop-types";
import { YMaps, Map, Placemark, Polyline } from 'react-yandex-maps';

class YMap extends Component {

    static propTypes = {
        mapState: PropTypes.shape({ //начальные координаты карты
            center: PropTypes.array.isRequired,
            zoom: PropTypes.number.isRequired
        }),
        points: PropTypes.array,//точки с координатами
        onGeometryChange: PropTypes.func, //действия при изменение положения точки
        onDragMap: PropTypes.func//действия при смещении центра карты
    };

    constructor(props){
        super(props);

        this.myMap= React.createRef();
        this.addEventDrag = false;
    }

    render() {
        const {mapState, points, onGeometryChange} = this.props;

        //записываем все координаты
        this.coordinates = [];
        for (let i = 0; i < points.length; i++){
            this.coordinates.push(points[i].coordinates);
        }

        //Перебираем маркеры
        const markerElements = points.map(point =>
            <Placemark key={point.id}
                geometry={{
                    type: 'Point',
                    coordinates: point.coordinates,
                }}
                properties={{
                    iconContent: point.title,
                    hintContent: point.title,
                    balloonContent: point.title,
                }}
                options={{
                    preset: 'islands#blackStretchyIcon',
                    draggable: true,
                }}
                onGeometryChange={onGeometryChange.bind(this, point.id)}
            />
        );
        return(
            <YMaps>
                <Map state={mapState} width="100%" height="100%" ref={this.myMap} onMouseDown={this.onMapClick}>
                    {markerElements}
                    <Polyline
                        geometry={{
                            type: 'LineString',
                            coordinates: this.coordinates,
                        }}
                        properties={{
                            hintContent: 'линия',
                        }}
                    />
                </Map>
            </YMaps>
        );
    }



    //кликнули по карте
    onMapClick = () => {
        if(!this.addEventDrag){
            const {onDragMap} = this.props;
            try {
                this.addEventDrag = true;
                //событие перемещения по карте
                let map = this.myMap.current.state.instance;
                map.events.add('actionend', function (e) {
                    //смещаем центр карты
                    var pixelCenter = map.getGlobalPixelCenter();
                    var geoCenter = map.options.get('projection').fromGlobalPixels(pixelCenter, map.getZoom());
                    //смещаем центр карты
                    onDragMap(geoCenter);
                });
            }catch(e){}
        }
        console.log();
    }
}

export default YMap;