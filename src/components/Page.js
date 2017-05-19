import React, {PureComponent} from 'react';
import Calendar from './Calendar';
import EventDetailOverlay from './EventDetailOverlay';
import {filterEventsByDay, getEventFromEvents, getDisplayDate} from '../utils';
import DATA_SET from '../utils/data';
import moment from 'moment'
import {VIEWS} from '../utils/constants'
import ViewToggle from './ViewToggle'

import './Page.css';

const DayNavigator = ({dateDisplay, onPrev, onNext}) => {
    return (
        <nav className="page__nav">
            <button
                className="page__nav-button page__prev-day"
                title="Go to previous day"
                onClick={onPrev}
            />
            <h2 className="page__date">{dateDisplay}</h2>
            <button
                className="page__nav-button page__next-day"
                title="Go to next day"
                onClick={onNext}
            />
        </nav>
    );
};

export default class Page extends PureComponent {
    state = {
        // unfiltered list of events
        events: DATA_SET,

        // The currently selected day represented by numerical timestamp
        day: Date.now(),

        selectedView: VIEWS.DAY,

        // The currently selected event in the agenda
        // (mainly to trigger event detail overlay)
        selectedEventId: undefined
    }

    constructor(props) {
        super(props)
        this.bodyElem = document.getElementsByTagName(`BODY`)[0]
    }

    changeView (selectedView) {
        this.setState({
            selectedView
        })
    }

    _handleSelectEvent(selectedEventId) {
        this.setState({selectedEventId});
    }

    _handleEventDetailOverlayClose() {
        this.setState({selectedEventId: undefined});
    }

    _handlePrev() {
        // TODO: Update this.state.day to go back 1 day so previous button works
        this.setState(prevState => ({
            day: moment(prevState.day).subtract(1, `days`)
        }))
    }

    _handleNext() {
        // TODO: Update this.state.day to go forward 1 day so next button works
        this.setState(prevState => ({
            day: moment(prevState.day).add(1, `days`)
        }))
    }

    render() {
        let {events, day, selectedEventId} = this.state;
        let filteredEvents = filterEventsByDay(events, day);
        let selectedEvent = getEventFromEvents(events, selectedEventId);
        let eventDetailOverlay;

        if (selectedEvent) {
            this.bodyElem.className = `no-scroll`
            eventDetailOverlay = (
                <EventDetailOverlay
                    event={selectedEvent}
                    onClose={this._handleEventDetailOverlayClose.bind(this)}
                />
            );
        } else {
            // TODO (mmarcus): Idealy this class would just be controlled via state
            this.bodyElem.className = ``
        }

        return (
            <div className="page">
                <header className="page__header">
                    <h1 className="page__title">Daily Agenda</h1>
                </header>
                <DayNavigator
                    dateDisplay={getDisplayDate(day)}
                    onPrev={this._handlePrev.bind(this)}
                    onNext={this._handleNext.bind(this)}
                />
                <ViewToggle {...this.state} changeView={this.changeView.bind(this)} />
                <Calendar events={filteredEvents} onSelectEvent={this._handleSelectEvent.bind(this)} />
                {eventDetailOverlay}
            </div>
        );
    }
}
