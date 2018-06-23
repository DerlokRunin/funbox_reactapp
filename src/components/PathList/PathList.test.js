import React from 'react';
import PathList from './PathList';


it('проверка рендеринга списка', () => {
    let points = [
        {id:1, title:'test', coordinates: [42.423, 35.353] },
        {id:2, title:'test2', coordinates: [42.423, 35.353] },
        {id:3, title:'test3', coordinates: [42.423, 35.353] }
    ];
    const wrapper = shallow(
        <PathList points={points} onDelete={function () {}} onRevertPoints={function () {}}/>
    );
    expect(wrapper).toMatchSnapshot();
});