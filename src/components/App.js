import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

import PathList from './PathList/PathList'
import YMap from './YMap/YMap';

class App extends Component {

  state = {
      points : [],
      mapState : { center: [55.76, 37.64], zoom: 14 },
  };

  render() {
    return (
      <div className="container-fluid height-max container-app">
          <div className="row height-max">
              <div className="col-6">
                  <form onSubmit={this.createPoint}>
                      <input type="text" placeholder="Новая точка маршрута" className="form-control"/>
                  </form>
                  <PathList points={this.state.points} onDelete={this.removePoint} onRevertPoints={this.onRevertPoints}/>
              </div>
              <div className="col-6">
                  <YMap mapState={this.state.mapState}
                        points={this.state.points}
                        onGeometryChange={this.onGeometryChange}
                        onDragMap={this.onDragMap}
                  />
              </div>
          </div>
      </div>
    );
  }


  //создаем новую точку
  createPoint = (event) => {
    event.preventDefault();
    let val = event.target.children[0].value;
    this.setState({
        points : this.state.points.concat([{
            id:Math.random(),
            title:val,
            coordinates: this.state.mapState.center

        }])
    });
    event.target.children[0].value = "";
    //console.log(this.state.points);
  };


  //Удаляем точку
  removePoint = (id) =>{
    let delete_id = this.searchPointIndexById(id);
    if(delete_id >= 0){
        //удаляем из массива
        let new_arr = this.state.points.slice();
        new_arr.splice(delete_id, 1);
        this.setState({
            points : new_arr
        });
    }
  };

  //смена местами точек
  onRevertPoints = (to, from) =>{
      let new_arr = this.state.points.slice();
      //изменяем массив points
      new_arr.splice(to, 0, new_arr.splice(from, 1)[0]);
      this.setState({
          points : new_arr
      });
  };

  //изменение положения точки на карте(нужно оптимизировать!!!)
  onGeometryChange = (id, event) => {
      let coordinates = event.originalEvent.target.geometry._coordinates;
      let search_id = this.searchPointIndexById(id);
      if(search_id >= 0){
          let new_arr = this.state.points.slice();
          new_arr[search_id] = {id: new_arr[search_id].id, title: new_arr[search_id].title, coordinates: coordinates};
          this.setState({
              points : new_arr
          });
      }
  };

  //Центр отображения карты смещен
  onDragMap = (newCenter) => {
      if(newCenter[0] !== this.state.mapState.center[1] && newCenter[1] !== this.state.mapState.center[1]) {
          this.setState({
              mapState: {center: newCenter, zoom: this.state.mapState.zoom}
          });
      }
  };

  //Поиск index точки в массиве по id точки
  searchPointIndexById = (id) => {
      let delete_id = -1;
      for (let i = 0; i < this.state.points.length; i++){
          if(this.state.points[i].id === id){
              delete_id = i;
              break;
          }
      }
      return delete_id;
  }
}

export default App;
