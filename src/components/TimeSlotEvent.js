import React, {PureComponent, PropTypes} from 'react';
import {EVENT_PROP_TYPE} from './constants';
import moment from 'moment'

import './TimeSlotEvent.css';

export default class TimeSlotEvent extends PureComponent {
    static propTypes = {
        event: EVENT_PROP_TYPE.isRequired,
        onSelect: PropTypes.func.isRequired,
    }

    render() {
        let {
            event: {title, color, start},
            onSelect,
        } = this.props;

        let classNames = [
            `time-slot-event`,
            `time-slot-event--${color}`
        ]

        if (start < Date.now()) {
            classNames.push(`time-slot-event--past`)
        }

        return (
            <button className={classNames.join(` `)} onClick={onSelect}>
                {moment(start).format('L LT')}: {title}
            </button>
        )
    }
}
