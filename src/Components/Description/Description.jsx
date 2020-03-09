import React from 'react';
import './Description.css';

function Description(props) {
    return (
        <div className="description">
            <table>
                <thead>
                    <tr>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Quisque auctor dictum malesuada. {props.data}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Description;