import React from 'react';
import Path from './Path';


it('проверка рендеринга элемента списка', () => {
    const wrapper = shallow(
        <Path point={{id:1, title:'test', coordinates: [42.423, 35.353] }} onDelete={function () {}}/>
    );
    expect(wrapper).toMatchSnapshot();
});