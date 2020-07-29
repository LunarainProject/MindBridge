import React from 'react';

export default class Image extends React.Component {
    constructor(props) { super(props); }
    render() { 

        const { resizeMode='contain', width, height, src, style, ...props } = this.props;
        const add_style = {
            backgroundImage: `url("${src}")`,
            backgroundSize: resizeMode,
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',

            width: width,
            height: height,
        };

        return (
            <div {...props} style={{ ...style, ...add_style }} />
        );
    }
}