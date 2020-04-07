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
                            {props.data}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Description;