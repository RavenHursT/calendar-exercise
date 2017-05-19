import React from 'react'
import {VIEWS} from '../utils/constants'

import './ViewToggle.css'

export default class ViewToggle extends React.PureComponent {

    getToggleLi ({selectedView, changeView}, view, index) {
        let classes = [
            `view-button`
        ]
        console.log(selectedView, view)
        if (selectedView === view) {
            classes.push(`selected`)
        }

        return <li
            className={
                classes.length === 1 ? classes[0] : classes.join(` `)
            }
            key={index}
            onClick={changeView.bind(null, view)}
        >{view}</li>
    }

    render () {
        return (
            <ul className="view-toggle">
                {
                    Object.keys(VIEWS).map(
                        this.getToggleLi.bind(null, {...this.props})
                    )
                }
            </ul>
        )
    }
}
