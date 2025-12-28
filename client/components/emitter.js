import { EventEmitter } from 'events';

export const snackBarEvents = new EventEmitter();

export const showSnackbar = (message, type='') => {
    snackBarEvents.emit('show', { message, type});
}