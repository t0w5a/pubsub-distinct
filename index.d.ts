// Type definitions for PubSubDistinct
// Project: PubSubDistinct
// Definitions by: tomsa.md


/*~ If this module is a UMD module that exposes a global variable 'myClassLib' when
 *~ loaded outside a module loader environment, declare that global here.
 *~ Otherwise, delete this declaration.
 */

import {ReplaySubject} from 'rxjs/ReplaySubject'
import {Subscription} from 'rxjs/Subscription';

/*~ This declaration specifies that the class constructor function
 *~ is the exported object from the file
 */

/*~ If you want to expose types from your module as well, you can
 *~ place them in this block.
 */

declare class PubSubDistinct {
    protected static events: any;

    static publish(eventName: string, data: any, previousMessagesNr?: number, saveHash?: boolean): void;

    static publishDistinct(eventName: string, data: any, previousMessagesNr?: number): void;

    static subscribe(eventName: string, callback: (data?: any) => any, previousMessagesNr?: number): Subscription;

    static subscribeOnce(eventName: string, callback: (data?: any) => any): Subscription|boolean;

    static unsubscribe(subscriber: any): void;

    static unsubscribeAll(subscribers: Subscription[]): void;

    static dispose(eventName: string): void;

    static hasSubscribers(eventName: string): boolean;

    static getEvents(): any;

    static getSubjects(): any;

    static getSubjectByEventName(eventName: string, previousMessagesNr: number): ReplaySubject<any>;

    static isCallback(callback: (data?: any) => any): boolean;

    static setHashToEvent(eventName: string, dataHash: string): void;

    static getEventHash(eventName: string): string|boolean;

    static getDataHash(data: any): string;
}

export {PubSubDistinct, Subscription};
