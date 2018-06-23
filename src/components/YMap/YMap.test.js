import React from 'react';
import YMap from './YMap';


it('проверка рендеринга yandex map', () => {
    let points = [
        {id:1, title:'test', coordinates: [42.423, 35.353] },
        {id:2, title:'test2', coordinates: [42.423, 35.353] },
        {id:3, title:'test3', coordinates: [42.423, 35.353] }
    ];
    let mapState = {center: [42.423, 35.353], zoom: 14};

    const wrapper = shallow(
        <YMap mapState={mapState}
              points={points}
              onGeometryChange={function () {}}
              onDragMap={function () {}}
        />
    );
    expect(wrapper).toMatchSnapshot();
});